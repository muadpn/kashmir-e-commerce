"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import HeroImage from "@/components/hero/HeroImage";
import Signin from "@/components/SignUp/SignIn";
import Signup from "@/assets/Images/Signup.jpg";
import { signOut, useSession } from "next-auth/react";
const SignupPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "authenticated") router.push("/store");

  // const onSignup = async () => {};

  return (
    <div className="flex items-center justify-center rounded-full w-full ">
      <div className="flex bg-white rounded-3xl  items-center justify-center p-10">
        <div className="hidden md:flex">
          <Image alt="" src={Signup} width={550} height={550} />
        </div>
        <div className="py-7 px-7">
          <Signin />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
