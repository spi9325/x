"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { CiMail, CiUser } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdHomeFilled } from "react-icons/md";
import { RiQuillPenAiLine } from "react-icons/ri";

interface profileType {
  id: string;
  name: string;
  emailVerified: boolean;
  profile?: string;
  bio?: string;
  createdAt:string

}


export const Sidebar = () => {
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

  useEffect(() => {
    async function checkAuth() {
      const { data: session, error } = await authClient.getSession();
      if (!session?.user) {
        redirect("/signin");
      }
    }
      checkAuth();
  }, []);

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


  return (
    <section className="border border-gray-600 xl:w-[20%] h-screen">
      <div className="text-3xl py-2 flex justify-center xl:block ">
        <FaXTwitter color="white" />
      </div>

      <div className="flex flex-col py-3 gap-3 h-[70%]">
        <Link href={"/"} className="mx-auto flex justify-center xl:justify-normal xl:mx-0 gap-5 py-2 rounded-3xl px-2 items-center hover:bg-slate-900 cursor-pointer w-[80%]">
          <MdHomeFilled color="white" className="text-[50px] xl:text-[33px] " />
          <span className="font-semibold text-white text-[20px] hidden xl:block">
            Home
          </span>
        </Link>
        <div className="mx-auto flex justify-center xl:justify-normal xl:mx-0 gap-5 py-2 rounded-3xl px-2 items-center hover:bg-slate-900 cursor-pointer w-[80%]">
          <CiMail color="white" className="text-[40px] xl:text-[30px]" />
          <span className=" text-white text-[20px] hidden xl:block">
            Messages
          </span>
        </div>
        <Link href={"/profile"} className="mx-auto flex justify-center xl:justify-normal xl:mx-0 gap-5 py-2 rounded-3xl px-2 items-center hover:bg-slate-900 cursor-pointer w-[80%]">
          <CiUser color="white" className="text-[40px] xl:text-[30px]" />
          <span className="text-white text-[20px] hidden xl:block">
            Profile
          </span>
        </Link>
      </div>

      <div className=" mt-3">
        <Link href={"/"}>
          <Button className="w-[94%] cursor-pointer py-6 text-lg bg-white text-black rounded-4xl hover:bg-slate-200 hidden xl:flex">
              Post
          </Button>
        </Link>
        <div className="w-[50px] h-[50px] mx-auto xl:mx-0 xl:hidden bg-white flex justify-center items-center rounded-full">
          {" "}
          <RiQuillPenAiLine className="text-[30px]" />
        </div>
      </div>

      <div className=" mt-9 relative py-1 px-1 flex justify-between items-center gap-3">
        <div className="w-[45px] mx-auto xl:mx-0 bg-slate-300 h-[45px] rounded-full relative overflow-hidden">
             {profile.profile && <Image src={`${profile.profile}`} alt="image of post" fill />}
        </div>
        <div className=" w-[80%] text-white xl:flex xl:flex-col hidden">
          <span className="">{profile.name}</span>
          <span className="text-slate-500">@ {profile.name}</span>
        </div>
        {/* <div className="hidden text-white xl:flex justify-center items-center pr-3 cursor-pointer">
          <HiOutlineDotsHorizontal color="white" size={20} />
        </div> */}
      </div>
    </section>
  );
};
