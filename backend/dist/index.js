import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
dotenv.config();
const PORT = process.env.PORT || 3001;
app.use(cors({
    origin: "http://your-frontend-domain.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => { console.log('listning on port ' + PORT); });
//# sourceMappingURL=index.js.map