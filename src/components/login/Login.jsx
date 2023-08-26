"use client";
import React, { useEffect, useState } from "react";
import GoogleButton from "../Button/GoogleButton";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import google from "@/assets/Images/icons8-google-192.png";
import Image from "next/image";
import { UsernameValidator } from "@/validations/SignUpValidations";
import {
  EmailHelper,
  PasswordHelper,
  UserNameHelper,
} from "@/helpers/SignInChecker";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "authenticated") console.log("USER IS AUTHENTICATED", session);
  const [FormData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [error, setError] = useState({
    Email: "",
    Password: "",
  });
  const handleErrorChange = (ErrorDetails, ErrorTarget) => {
    setError((prev) => {
      return {
        ...prev,
        [ErrorTarget]: ErrorDetails,
      };
    });
  };
  const HandleFormChange = (e) => {
    e.preventDefault();
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const isEmailValid = EmailHelper(
      FormData.Email,
      handleErrorChange
    );

    if (!isEmailValid) {
      return;
    }
    try {
      // const res = await axios.post("/api/auth/login", { FormData });
      // if (res.status === 200) {

      //     toast.success("Login Sucessfull", {
      //       position: "top-center",
      //     });
      signIn("credentials", { ...FormData, redirect: false }).then(
        (callback) => {
          if (callback?.error) {
            console.log(callback?.error);
            toast.error(callback.error);
          }
          if (callback?.ok && !callback.error) {
            toast.success(`Welcome ${FormData.Email}`);
            router.push("/");
          }
        }
      );

      // setTimeout(() => {
      // router.push('/store')
      // }, [200]);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex flex-col max-w-max items-center ">
      <h1 className="font-bold text-4xl text-[#3E3E3E]">Sign up</h1>
      <form method="POST" onSubmit={handleSignIn}>
        {" "}
        <div className="flex flex-col w-max items-start py-2">
          <label htmlFor="Email" className="mt-2 px-2 ">
            Email
          </label>
          <input
            id="Email"
            value={FormData.Email}
            required
            onChange={HandleFormChange}
            name="Email"
            type="text"
            placeholder="jhondoe@gmail.com"
            className="bg-[#D9D9D9] py-3 px-5 indent-2  rounded-lg"
          />
          {error.Email && (
            <p className="text-red-600 px-2 py-1 max-w-[250px] text-center font-medium indent-3 text-xs">
              {error.Email}
            </p>
          )}

          <label htmlFor="password" className="mt-2 px-2">
            Password
          </label>
          <input
            value={FormData.Password}
            name="Password"
            id="password"
            onChange={HandleFormChange}
            required
            type="password"
            placeholder="Caps,num,letter,Special char"
            className="bg-[#D9D9D9] py-3 px-5 indent-2 rounded-lg "
          />
          {error.Password && (
            <p className="text-red-600 font-medium px-2 py-1 text-xs text-clip max-w-[17rem]">
              {error.Password}
            </p>
          )}
          <div className="flex flex-col items-center justify-center self-center w-full">
            <button
              type="submit"
              className="bg-[#3E3E3E] rounded-lg w-full py-2 text-white font-semibold  mt-4 flex items-center justify-center gap-2"
            >
              {/* <Image src={google} width={24} height={24} alt=""  /> */}
              Sign Up
            </button>
            <p className="py-3 text-lg font-medium ">or Use</p>
            <GoogleButton Classes="bg-[#D9D9D9] " />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
