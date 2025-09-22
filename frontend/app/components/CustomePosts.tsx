"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";

interface postType {
  post: string;
  imageUrl: string;
  emailVerified: boolean;
  username: string;
}

export const CustomePosts = () => {
  const [posts, setPosts] = useState<postType[]>([]);
  useEffect(() => {
    async function getPost() {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/get/userposts`,
        { withCredentials: true }
      );
      console.log(result.data);
      result.data.posts.map((cur: postType) => {
        setPosts((prev) => [
          ...prev,
          {
            post: cur.post,
            imageUrl: cur.imageUrl,
            emailVerified: cur.emailVerified,
            username: cur.username,
          },
        ]);
      });
    }
    getPost();

    return ()=>{
        setPosts([]);
    }
  }, []);
  return (
    <div className="p-4 rounded mt-2 flex flex-col gap-4 xl:mx-9 text-white">
      {posts.map((cur, index) => (
        <div key={index} className="">
          <div className="w-full mb-6 border border-gray-600 xl:w-[90%]"/>
          <div className=" flex gap-2">
            {/* profile image here */}
            <div className="relative w-[50px] h-[50px] rounded-full bg-gray-300 overflow-hidden">
              <Image src={cur.imageUrl} alt="image of post" fill />
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
            <p className="whitespace-pre-wrap w-[82%] p-[2px]">
              {cur.post}
            </p>
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
        </div>
      ))}
    </div>
  );
};
