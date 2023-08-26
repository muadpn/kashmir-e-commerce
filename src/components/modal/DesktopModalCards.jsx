import Image from "next/image";
import React from "react";
import UserLogo from "@/assets/Images/UserLogo.png";
import Link from "next/link";
import { HandleSignOut } from "../Singout/handleSignout";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const DesktopModalCards = ({ title, image, options, IsSignout }) => {
  const router = useRouter();
  const HandleSignOut = async () => {
    try {
      signOut();
      toast.success("Logged Out");
      // setTimeout(() => {
        router.push("/store");
      // }, [200]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="relative flex  items-start  w-full pt-2">
        <div>
          <Image
            src={image}
            alt=""
            width={28}
            height={20}
            className={`w-7 ${title === "Logout" && "h-6"}`}
          />
        </div>
        <div className="px-2 leading-6 w-full ">
          <h1
            className="font-bold text-xl cursor-pointer peer"
            onClick={IsSignout && HandleSignOut}
          >
            {title}
          </h1>

          {options &&
            options.map((item, index) => {
              return (
                <p key={index}>
                  <Link href={item.url} className="">
                    {item.Title}
                  </Link>{" "}
                </p>
              );
            })}
        </div>
      </div>
      <div className="border-[1px] min-w-[200px] absolute button-0  self-center border-black"></div>
    </>
  );
};

export default DesktopModalCards;
