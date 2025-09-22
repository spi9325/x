import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./client.js";
import { customSession } from "better-auth/plugins";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  trustedOrigins: [`http://localhost:3000`],
  baseURL: `http://localhost:8080`,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    },
  },

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  plugins: [
        customSession(async ({ user, session }) => {
          const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: {       
          profile: true 
        },
      });
            return {
                user: {
                    ...user,
                    profile: dbUser?.profile,
                },
                session
            };
        }),
    ],
});
