
import crypto from 'crypto';
import { v4 as uuid } from "uuid";
import { db } from "./db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';


export const generateTwoFactorToken = async(email:string) => {
  const token = crypto.randomInt(100000, 1000000).toString();
  // Todo:Later change to 15 minutes
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if(existingToken){
    await db.twoFactorToken.delete({
      where:{
        id:existingToken.id
      }
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data:{
      email,
      expires,
      token
    }
  });

  return twoFactorToken;
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000); //1hr

  const existingToken = await getPasswordResetTokenByToken(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000); //1hr

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};