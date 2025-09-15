import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./client.js";

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET!,
    trustedOrigins: [`${process.env.FRONTEND_URL}`],
    emailAndPassword: {
    enabled: true, 
  },
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
});