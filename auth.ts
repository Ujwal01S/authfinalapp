
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import NextAuth from "next-auth";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";


export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    // next auth shows other page to display signin and error, so create path and folder yourself

    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    //events: it is used to add side effects
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  callbacks: {
    // async signIn({ user }) {
    // //if the email is not verified , donot allow for signin.
    //   const existingUser = await getUserById(user.id);

    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }
    //   return true;
    // },

    async signIn({ user, account }) {
      //Allow 0Auth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);

      //Prevent sigin in without email verification
      if (!existingUser?.emailVerified) return false;

      if(existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
        
        if(!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: {id:twoFactorConfirmation.id}
        });

      }

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub; //session ma new field: id haleko , jasma token.sub vanne id haleko
      }
      if (token.role && session.user) {
        session.user.role = token.role as "ADMIN" | "USER"; //session ma new field: role haleko, jasma token.role vanne role haleko
      }

      // if (session.user) {
      //   session.user.customField = token.customField; //jwt ko token.customField lai liyeko, yo settings page ma display gareko xa
      // }

      if(session.user){
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }      
      return session;
    },

    async jwt({ token }) {
      //user, profile do not use because it is undefined many times.

      // token.customField = "test"; // new field add gareko, token {} ma.

      // console.log("I am being called again:",token);

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(
        existingUser.id
      );

      token.isOAuth = !!existingAccount;
      token.role = existingUser.role;
      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
