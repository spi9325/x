"use client";
import { CustomePosts } from "@/app/components/CustomePosts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoImage } from "react-icons/io5";
import { toast } from "react-toastify";

interface profileType {
  id: string;
  name: string;
  emailVerified: boolean;
  profile?: string;
  bio?: string;
  createdAt:string

}

const Page = () => {
  const [edit, setEdit] = useState(false);
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
  const [bio, setBio] = useState("");
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<File | null>(null);

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

  const saveProfile = async () => {
    if (!fileRef.current) return;

    const formData = new FormData();
    formData.append("image", fileRef.current as Blob);
    formData.append("bio", bio);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    await res.json();
    if (res.status === 200) {
      toast.success("post saved..");
      setImage("");
      setBio("");
      router.refresh();
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

  return (
    <section className={`p-1 max-w-[1440px] h-screen w-full relative ${edit ? "overflow-hidden" : "overflow-x-hidden"} scrollbar-hide`}>
      {/* profile section */}
      <div className="">
            <div className=" px-2 pt-9 mx-auto text-white flex justify-between">
              <div className=" w-[20%] aspect-square rounded-full text-center relative overflow-hidden flex justify-center items-center">

                  {profile.profile ? <Image src={`${profile.profile}`} alt="image of post" fill /> : <p onClick={()=>setEdit(true)} className="flex justify-center bg-green-400 rounded-2xl px-1">Edit Profile</p> }

              </div>
              <div className="flex items-end p-4">
                <Button
                  onClick={() => setEdit(true)}
                  className="text-white cursor-pointer px-6 rounded-xl border"
                >
                  Edit Profile
                </Button>
              </div>
            </div>

            <div className="mt-2 text-white px-5">
              <div className="flex gap-6 items-center">
                <span className="text-2xl font-bold">{profile.name}</span>
                <span className="">{profile.emailVerified ? "Verified" : "Not Verified"}</span>
              </div>
              <span className="text-gray-500">@ {profile.name}</span>
              <div className="mt-2 flex flex-col gap-2">
                <span className="">{profile.bio}</span>
                <span className="text-gray-500">@ Joined At {new Date(profile.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
      </div>

      <div className=" mt-3">
        <CustomePosts />
      </div>

      {/* edit profile  */}

      {edit && (
        <div className="absolute w-[99%] h-screen p-5 top-2 left-0 bg-slate-900 overflow-x-hidden">
          <div className="border p-2">
            <div
              onClick={() => setEdit(false)}
              className="flex justify-between"
            >
              <span className="bg-white cursor-pointer flex justify-center items-center w-[30px] h-[30px] rounded-full">
                X
              </span>
              <Button
                onClick={() => saveProfile()}
                className="hover:bg-gray-500 bg-gray-700 cursor-pointer"
              >
                save
              </Button>
            </div>
            <div className="w-[20%] bg-white aspect-square border rounded-full mt-2 flex justify-center items-center relative overflow-hidden">
              <div className=" text-blue-500 cursor-pointer flex justify-center items-center">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-2xl z-50 text-red-500 bg-black absolute"
                >
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

              {image ? (
                <Image
                  // src={`${profile.profile ? profile.profile : image ? image : ""}`}
                  src={`${ image ? image : ""}`}
                  alt="pro"
                  fill
                  className="absolute opacity-50 z-2"
                />
              ) : 
                profile.profile && (
                <Image
                  // src={`${profile.profile ? profile.profile : image ? image : ""}`}
                  src={`${ profile.profile}`}
                  alt="pro"
                  fill
                  className="absolute opacity-50 z-2"
                />
                )
              }
            </div>
          </div>

          <div className="border text-white mt-2 p-5">
            <label htmlFor="">Bio :</label>
            <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-ful placeholder:text-xl scrollbar-hide mt-4"
            placeholder={profile.bio}
            id="message"
          />
            
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;
