import { Router } from "express";
import prisma from "../lib/client.js";

export const getUserPosts = Router();

getUserPosts.get("/userposts", async (req, res) => {
  try {
        const posts = await prisma.post.findMany({
            where:{
                userId:req.id!
            }
        });
        if(posts){
            res.status(200).json({posts});
        }else{
            res.status(500).json({error:"internal server error"})
        }
  } catch (error) {
    console.log(error);
  }
});
