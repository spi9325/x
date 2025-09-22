declare global {
    namespace Express {
        interface Request {
            id?: string;
            email?: string;
            username?: string;
            emailVarified?: boolean;
            profile?: string;
        }
    }
}
export {};
//# sourceMappingURL=custometypes.d.ts.map