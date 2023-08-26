import React from "react";
import google from "@/assets/Images/icons8-google-192.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react";

const GoogleButton = ({Classes}) => {
  const handleSignIn = async ()=>{
    signIn("google", {redirect: false}).then(
      (callback) => {
        if (callback?.error) {
          console.log(callback?.error);
          toast.error(callback.error);
        }
        if (callback?.ok && !callback.error) {
          toast.success(`Welcome`);
          router.push("/");
        }
      }
    );
  }
  const router = useRouter();
  return (
    <button type="button" onClick={handleSignIn}  className={`px-6 py-3 w-full items-center justify-center flex gap-2 rounded-xl ${Classes}`}>
      <Image src={google} width={24} height={24} alt=""  />
      <h1 className="font-semibold">Google</h1>
    </button>
  );
};

export default GoogleButton;
