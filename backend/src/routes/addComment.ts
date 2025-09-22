import { Router } from "express";
import { verifyUser } from "../middleware/verifyUser.js";
import prisma from "../lib/client.js";


export const addComment = Router();

addComment.post("/comment",verifyUser,async(req,res)=>{
    try {
        const {postId,userComment,userProfile} = req.body;
        if(!postId || !userComment || !userProfile) return res.status(403).send("provide some comment data...")
        await prisma.comment.create({
            data:{
            userId:req.id?.toString()!,
            postId,
            comment:userComment.toString(),
            userProfile:req.profile!,
            username:req.username!
            }
        })
        res.status(200).send("comment added...");
    } catch (error) {
        console.log(error);
    }
})