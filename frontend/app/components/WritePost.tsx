"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoImage } from "react-icons/io5";
import { Posts } from "./Posts";
import { toast } from "react-toastify";
import axios from "axios";

interface profileType {
  id: string;
  name: string;
  emailVerified: boolean;
  profile?: string;
  bio?: string;
  createdAt:string

}

export const WritePost = () => {
  const [image, setImage] = useState<string | null>(null);
  const [post, setPost] = useState<string>("");
  const fileRef = useRef<File | null>(null);
    const [profile, setProfile] = useState<profileType>(
        {
        id: "",
        name: "",
        emailVerified: false,
        profile: "",
        bio: "",
        createdAt:""
        }
    );

  const handlePost = async () => {
    if (!fileRef.current) return;

    const formData = new FormData();
    formData.append("image", fileRef.current as Blob);
    formData.append("post",post)

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
    method: "POST",
    body: formData,
    credentials:"include"
  });

  await res.json();
  if(res.status === 200){
    toast.success("post saved..");
    setImage("");
    setPost("");
  }
  };

useEffect(() => {
    async function getProfile() {
      const {data} = await axios.get<{user:profileType}>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/get/profile`,
        { withCredentials: true }
      );
      setProfile({id:data.user.id,name:data.user.name,emailVerified:data.user.emailVerified,profile:data.user.profile,bio:data.user.bio,createdAt:data.user.createdAt})
    }
    getProfile();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      fileRef.current = file;
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  
  return (
    <section className="text-white p-2 h-[770px] overflow-x-hidden scrollbar-hide">
      <div className=" text-center text-2xl border-b border-gray-500 pb-3">
        <span className="border-b-[4px] border-green-500">Explore</span>
      </div>

      {/* main post write */}
      <div className="flex gap-2 mt-4 p-4 overflow-x-hidden">
        <div className="w-[64px] h-[55px] md:h-[60px] rounded-full bg-gray-300 relative overflow-hidden">

          {profile.profile && <Image src={`${profile.profile}`} alt="image of post" fill />}
          
        </div>
        <div className=" flex flex-col gap-2 relative w-full overflow-hidden p-2">
          <Textarea
            value={post}
            onChange={(e) => setPost(e.target.value)}
            className="w-ful placeholder:text-xl scrollbar-hide"
            placeholder="Whats happening?"
            id="message"
          />
          {image && (
            <div className="w-full h-[500px] flex justify-center items-center relative rounded-xl bg-slate-900 ">
              {image && (
                <div className="w-[300px] h-[100%] flex justify-center items-center">
                  <Image
                    src={image}
                    alt="Selected Image"
                    width={100}
                    height={100}
                    className="w-full"
                  />
                </div>
              )}
              {image && (
                <span
                  onClick={() => setImage(null)}
                  className="absolute top-1 right-1 bg-white text-black cursor-pointer px-4 py-2 rounded-full"
                >
                  X
                </span>
              )}
            </div>
          )}
          <div className="border-y border-gray-500 py-3 flex justify-around items-center">
            <div className=" text-blue-500 cursor-pointer">
              <label htmlFor="file-upload" className="cursor-pointer text-2xl">
                <IoImage />
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
            </div>
            <Button
              onClick={handlePost}
              className="bg-white cursor-pointer text-black rounded-2xl hover:text-white hover:bg-slate-700"
            >
              POST
            </Button>

          </div>
        </div>
      </div>
      
      <Posts/>
    </section>
  );
};
