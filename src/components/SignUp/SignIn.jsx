import React, { useEffect, useState } from "react";
import GoogleButton from "../Button/GoogleButton";
import { signIn, signOut, useSession } from "next-auth/react";
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
const Signin = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  // destructuring session from useSession
  useEffect(() => {
    if (status === "loading") console.log(status);
  }, [status]);

  const [FormData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [error, setError] = useState({
    Username: "",
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
    toast.loading("Checking for data", { duration: 1500 });
    const isUsernameValid = UserNameHelper(
      FormData.Username,
      handleErrorChange
    );
    const isEmailValid = EmailHelper(FormData.Email, handleErrorChange);
    const isPasswordValid = PasswordHelper(
      FormData.Password,
      FormData.ConfirmPassword,
      handleErrorChange
    );
    if (!isEmailValid || !isPasswordValid || !isUsernameValid) {
      toast.error("Please Check the Credientials Provided");
      return;
    }
    setTimeout(() => {
      toast.loading("Saving Information", { duration: 1000 });
    }, [1500]);

    try {
      const res = await axios.post("/api/auth/signup", FormData);
      console.log(res);
      toast.success("Signed up Sucessfully!", { duration: 1500 });
      setTimeout(() => {
        if (res.status === 200) router.push("/login");
      }, [1700]);
    } catch (error) {
      console.log("this is From Error", error);
      toast.error("Something Went Wrong!, Please Try again later", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex flex-col max-w-max items-center">
      <div></div>
      <h1 className="font-bold text-4xl text-[#3E3E3E]">Sign up</h1>

      <form method="POST" onSubmit={handleSignIn}>
        {" "}
        <div className="flex flex-col w-max items-start py-2">
          <label htmlFor="username" className="mt-2 px-2 ">
            Username
          </label>
          <input
            id="username"
            value={FormData.Username}
            required
            onChange={HandleFormChange}
            name="Username"
            type="text"
            placeholder="Username"
            className="bg-[#D9D9D9] py-3 px-5 indent-2  rounded-lg"
          />
          {error.Username && (
            <p className="text-red-600 px-2 py-1  font-medium indent-3 text-xs">
              {error.Username}
            </p>
          )}
          <label htmlFor="email" className="mt-2 px-2">
            Email
          </label>
          <input
            value={FormData.Email}
            id="email"
            onChange={HandleFormChange}
            name="Email"
            required
            type="text"
            placeholder="Enter the Email"
            className="bg-[#D9D9D9] py-3 px-5 indent-2 rounded-lg "
          />
          {error.Email && (
            <p className="text-red-600 px-2 py-1  font-medium indent-3 text-xs">
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
            placeholder="Enter the Password"
            className="bg-[#D9D9D9] py-3 px-5 indent-2 rounded-lg "
          />

          <label htmlFor="confirmPassword" className="mt-2 px-2">
            Confirm Password
          </label>
          <input
            value={FormData.ConfirmPassword}
            id="confirmPassword"
            name="ConfirmPassword"
            onChange={HandleFormChange}
            required
            type="password"
            placeholder="Re-Enter the Password"
            className="bg-[#D9D9D9] py-3 px-5 indent-2 rounded-lg"
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
            <GoogleButton Classes="bg-[#D9D9D9]" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
