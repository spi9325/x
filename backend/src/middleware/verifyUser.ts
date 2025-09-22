import type { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";

export async function verifyUser(req:Request, res:Response, next:NextFunction) {
  const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
  if (!session?.user.email) {
     res.status(401).json({ message: "Unauthorized" });
  } else {
    req.id = session.user.id.toString();
    req.email = session.user.email;
    req.emailVarified = session.user.emailVerified;
    req.username = session.user.name;
    req.profile = session.user.profile || "";
    next();
  }
}