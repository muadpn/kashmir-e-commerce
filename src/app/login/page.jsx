"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Signup from "@/assets/Images/Signup.jpg";
import Login from "@/components/login/Login";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { useParams, useRouter, useSearchParams } from "next/navigation";
// import React from "react";
import { toast } from "react-hot-toast";
const LoginPage = () => {
  // const router = useRouter();
  // const {data: session, status } = useSession();
  // if (status === "authenticated") router.push("/store")
  // console.log(session)
  // console.log()
  const searchParams = useSearchParams();
  const message = searchParams.get("Message");
 
  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  },[message])
  
  // const router = useRouter();

  return (
    <div className="flex items-center justify-center rounded-full w-full ">
      <div className="flex bg-white rounded-3xl dark:bg-slate-950  dark:text-white  items-center justify-center p-10">
        <div className="hidden md:flex">
          <Image alt="" src={Signup} width={550} height={550} />
        </div>
        <div className="py-7 px-7">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
