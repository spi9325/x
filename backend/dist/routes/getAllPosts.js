import { Router } from "express";
import prisma from "../lib/client.js";
export const getAllPosts = Router();
getAllPosts.get("/allposts", async (req, res) => {
    try {
        const posts = await prisma.post.findMany({ include: { comments: true, user: true } });
        if (posts) {
            res.status(200).json({ posts });
        }
        else {
            res.status(500).json({ error: "internal server error" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
//# sourceMappingURL=getAllPosts.js.map