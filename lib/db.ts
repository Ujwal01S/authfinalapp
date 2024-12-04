import {PrismaClient} from "@prisma/client";

declare global {
    let prisma: PrismaClient | undefined;
}

//@ts-expect-error: Global Prisma instance type is not declared
export const db = globalThis.prisma || new PrismaClient();

// @ts-expect-error: Assinging to globalThis.prisma for deployment
if(process.env.NODE_ENV !== "production") globalThis.prisma = db;