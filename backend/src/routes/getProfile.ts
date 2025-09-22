import Router from "express"
import { verifyUser } from "../middleware/verifyUser.js";
import prisma from "../lib/client.js";

export const getProfile = Router();

getProfile.get("/profile",verifyUser,async(req,res)=>{
    try {
        const user = await prisma.user.findFirst({
            where:{
                id:req.id!
            }
        })
        res.status(200).json({user});
    } catch (error) {
        console.log(error);
    }
})