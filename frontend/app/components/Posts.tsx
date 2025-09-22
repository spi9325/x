"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { LuMessageCircle } from "react-icons/lu";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

interface postType {
  id: string;
  post: string;
  imageUrl: string;
  emailVerified: boolean;
  username: string;
  comments?: { comment: ""; id: ""; userId: "" }[];
  user?: { profile: ""; username: "" };
}

interface commentType {
  id: string;
  comment: string;
  postId: string;
  userId: string;
  userProfile: string;
  username: string;
}

export const Posts = () => {
  const [posts, setPosts] = useState<postType[]>([]);
  const [commentOpen, setCommentOpen] = useState({ open: false, id: "" });
  const [comment, setComment] = useState("");
  const [viewComment, setViewComment] = useState(false);
  const [allComment, setAllComment] = useState<commentType[]>([]);

  useEffect(() => {
    async function getPost() {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/get/allposts`,
        { withCredentials: true }
      );
      // console.log(result.data)
      result.data.posts.map((cur: postType) => {
        setPosts((prev) => [
          ...prev,
          {
            id: cur.id,
            post: cur.post,
            imageUrl: cur.imageUrl,
            emailVerified: cur.emailVerified,
            username: cur.username,
            comments: cur.comments,
            user: cur.user,
          },
        ]);
      });
    }
    getPost();

    return ()=>{
      setPosts([]);
    }
  }, []);



  async function getComments(postId: string) {
    const postComments = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/get/comments`,
      { postId },
      { withCredentials: true }
    );
    setAllComment(postComments.data.map((cur: commentType) => cur));
    setViewComment(true)
  }

  async function handelComment(
    postId: string,
    userComment: string,
    userProfile: string,
  ) {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/add/comment`,
      { postId, userComment, userProfile},
      { withCredentials: true }
    );
    if (res.status == 200) {
      setComment("");
      setCommentOpen({ open: false, id: "" });
      toast.success("");
    }
  }

  function handelClose(){
    setCommentOpen({ open: false, id: "" })
    setAllComment([]);
  }

  return (
    <div className="p-4 rounded mt-2 flex flex-col gap-4 xl:mx-9 relative">
      {posts.map((cur,index) => (
        <div key={index} className="">
          <div className="w-full mb-6 border border-gray-600 xl:w-[90%]" />
          <div className=" flex gap-2">
            {/* profile image here */}
            <div className="relative w-[55px] h-[50px] sm:w-[50px] sm:h-[50px] rounded-full bg-gray-300 overflow-hidden">
              {cur.user?.profile && (
                <Image src={cur?.user?.profile} alt="image of post" fill />
              )}
            </div>
            <div className=" flex gap-2 h-[50%]">
              <span className="">{cur?.username}</span>
              <span className="flex justify-center items-center text-blue-500 text-xl">
                {cur.emailVerified && <MdVerified />}
              </span>
              <span className="text-gray-500">@{cur.username}</span>
              <span className="text-gray-500">11h</span>
            </div>
          </div>

          <div className="mt-1 flex gap-2 justify-center items-center flex-col">
            <p className="whitespace-pre-wrap w-[82%] p-[2px]">{cur.post}</p>
            <div className="whitespace-pre-wrap w-[82%] p-8 rounded-xl">
              <Image
                src={cur.imageUrl}
                alt="image of post"
                width={500}
                height={500}
                className="rounded-xl"
              />
            </div>
          </div>
          {/* comment sec icon*/}
          <div
            onClick={() => setCommentOpen({ open: true, id: cur.id })}
            className="text-2xl flex items-center gap-2 mb-3"
          >
            <LuMessageCircle className="cursor-pointer" />{" "}
            <span className="text-sm">Comment</span>
          </div>
          <div className=" mb-4">
            <span onClick={() => getComments(cur.id)} className="cursor-pointer">
            View Comments
          </span>

          <span onClick={() =>handelClose() } className="mt-3 ml-8 cursor-pointer">
            Hide
          </span>
          </div>

          {
          viewComment &&  
            allComment.map((cmt,index) => (
             cmt.postId == cur.id &&
             <div key={index} className="border mt-2 p-1 flex gap-2">
               <div className={`border w-[50px] ${!cmt.userProfile ? "bg-slate-800 border-0" : "border-0"} h-[50px] rounded-full overflow-hidden`}>
                 {
                  cmt.userProfile && <Image
                   src={cmt.userProfile}
                   alt="profile image"
                   width={500}
                   height={500}
                 />
                 }
               </div>
               <div className="">
                 <span className="text-white">{cmt?.username}</span>
                 <p className="">{cmt.comment}</p>
               </div>
            </div>
          ))
          }

          {/* ========================================================================== */}

          {/* comment section to write commnet */}
          {commentOpen.open && (
            <div className="fixed top-10 border w-[80%] max-h-[500px] p-5 bg-slate-700">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full h-full resize-none max-h-[400px] placeholder:text-xl scrollbar-hide bg-black"
                placeholder="Whats happening?"
                id="message"
              />
              <div className="flex gap-3 mt-3">
                <Button onClick={() => setCommentOpen({ open: false, id: "" })}>
                  {" "}
                  Close{" "}
                </Button>
                <Button
                  onClick={() =>
                    handelComment(
                      cur.id,
                      comment,
                      cur?.user!.profile
                    )
                  }
                  className=""
                >
                  {" "}
                  Reply{" "}
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
