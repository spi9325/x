import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./client.js";
export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [`http://localhost:3000`],
    baseURL: `http://localhost:8080`,
    emailAndPassword: {
        enabled: true,
        autoSignIn: true
    },
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        },
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
});
//# sourceMappingURL=auth.js.map