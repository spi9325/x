import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
export async function user(req, res, next) {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });
    console.log(session, "__________________________________________________________________");
    next();
}
//# sourceMappingURL=user.js.map