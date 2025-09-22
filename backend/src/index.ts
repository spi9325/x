import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import { storage } from "./config/multerConfig.js";
import { auth } from "./lib/auth.js";
import prisma from "./lib/client.js";
import { verifyUser } from "./middleware/verifyUser.js";
import { fileURLToPath } from "url";
import path, { join } from "path";
import { getAllPosts } from "./routes/getAllPosts.js";
import { getUserPosts } from "./routes/getUserPosts.js";
import { getProfile } from "./routes/getProfile.js";
import { addComment } from "./routes/addComment.js";
import { getComments } from "./routes/getComment.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cookieParser());
dotenv.config();
const PORT = process.env.PORT || 8080;
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));


app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const upload = multer({ storage });
app.use("/uploads", express.static(join(__dirname, "../uploads")));

app.post("/upload", verifyUser, upload.single("image"), async(req, res) => {
    const imageUrl = `${process.env.BACKEND_URL}/uploads/${req.file?.filename}`;
  if(req.body.bio){
    await prisma.user.update({
      where:{
        id:req.id!
      },data:{
        profile:imageUrl,
        bio:req.body.bio!
      }
    })
    res.status(200).json({message:"profile updated..."})
  }else{
    await prisma.post.create({
    data:{
      userId: req?.id as string,
      post: req.body.post,
      imageUrl,
      username:req.username!,
      emailVerified:req.emailVarified!
    }
  })
  res.json({
    message: "success!",
  });
  }
  
});

app.use("/get",getAllPosts)
app.use("/get",getUserPosts)
app.use("/get",getProfile)
app.use("/add",addComment)
app.use("/get",getComments)


app.listen(PORT,()=>{console.log('listning on port '+PORT)});
