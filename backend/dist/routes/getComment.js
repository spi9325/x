import { Router } from "express";
import { verifyUser } from "../middleware/verifyUser.js";
import prisma from "../lib/client.js";
export const getComments = Router();
getComments.post("/comments", verifyUser, async (req, res) => {
    try {
        const { postId } = req.body;
        if (!postId)
            return res.status(402).send("provide postId...");
        const comments = await prisma.comment.findMany({
            where: {
                postId
            }
        });
        res.status(200).send(comments);
    }
    catch (error) {
        console.log(error);
    }
});
//# sourceMappingURL=getComment.js.map