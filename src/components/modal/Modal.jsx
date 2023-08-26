import React from "react";
import GoogleButton from "@/components/Button/GoogleButton";
import { useRouter } from "next/navigation";
const NotAuthMobileModal = ({ handleModal }) => {
  const router = useRouter();
  return (
    <>
      <div className="fixed z-50">
        <div className="flex">
          <div className="pt-[20%] min-w-[70%]  min-h-[100vh] bg-[#EBEBEB] z-50 rounded-tr-[3rem] flex justify-center ">
            <div className="">
              <div className="flex flex-col">
                {" "}
                <div className="flex gap-2 items-center">
                  <h1
                    className="font-extrabold text-xl min-w-max"
                    onClick={() => {
                      handleModal();
                      router.push("/signup");
                    }}
                  >
                    Sign Up
                  </h1>{" "}
                  <p className="font-medium">or</p> <GoogleButton  Classes="bg-white" />
                </div>
                <hr className="h-[3px] w-full bg-black mt-2 " />
              </div>
              <div className="flex flex-col pt-6">
                {" "}
                <div className="flex gap-2 items-center">
                  <h1
                    className="font-extrabold text-xl min-w-max"
                    onClick={() => {
                      handleModal();
                      router.push("/login");
                    }}
                  >
                    Login
                  </h1>{" "}
                  <p className="font-medium">or</p> <GoogleButton Classes="bg-white" />
                </div>
                <hr className="h-[3px] w-full bg-black mt-2 " />
              </div>
            </div>
          </div>
          <div
            className="max-w-[255px] min-w-[255px] min-h-[100vh]"
            onClick={() => handleModal()}
          ></div>
        </div>
      </div>
    </>
  );
};

export default NotAuthMobileModal;
