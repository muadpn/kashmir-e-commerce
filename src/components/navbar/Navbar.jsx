"use client";
import Link, { LinkProps } from "next/link";
// import React, { HTMLProps, FC } from "react";
import logo from "@/../public/Images/Logo.png";
import CartLogo from "@/assets/Images/shoppingcart.png";
import UserLogo from "@/assets/Images/UserLogo.png";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Modal from "../modal/Modal";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DesktopModal from "../modal/DesktopModal";
import { getServerSession } from "next-auth";
import NotAuthMobileModal from "../modal/Modal";
import MobileAuthModal from "../modal/MobileAuthModal";
const  Navbar = () => {
  const { data: session } = useSession();
  console.log(session)
  const ref = useRef(null);
  const router = useRouter();
  const [isModalToggle, setIsModalToggle] = useState(false);
  const [isDesktopModalToggle, setIsDesktopModalToggle] = useState(false);
  const HandleModalToggle = () => {
    setIsModalToggle((prev) => !prev);
  };
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
  const handleDesktopModal = (e) => {
    if (ref && !ref?.current?.contains(e.target)) {
      setIsDesktopModalToggle(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleDesktopModal, true);

    return () => {
      document.removeEventListener("click", handleDesktopModal, true);
    };
  }, []);

  return (
    <>
      <nav
        className={`flex flex-grow items-center justify-between sticky top-0 bg-[#EBEBEB] dark:bg-slate-950  dark:text-white  py-3 z-50  p-1 md:p-5 ${
          isModalToggle ? "rounded-br-3xl" : "rounded-b-3xl"
        }`}
      >
        <Link href="/">
          {" "}
          <Image
            src={logo}
            alt="hello"
            width={550}
            className=" md:w-20 w-full"
          />
        </Link>
        <div className="flex flex-col items-center">
          <div className="space-x-9 font-semibold">
            <Link href="/store">Store</Link>
            <Link href="/about">About</Link>
          </div>
          <div className="relative">
            <input
              type="search"
              name="search"
              id=""
              className="rounded-xl p-1 indent-2 max-w-[200px] focus:outline-none "
              placeholder="Search"
            />
            {/* <div className="bg-gray-500 w-6 h-6 grid place-content-center rounded-full absolute right-0 top-0 ">
              <h1>{'>'}</h1>
            </div> */}
          </div>
        </div>
        {/* Mobile Navigation */}
        <div className="flex gap-2 p-2 items-center justify-end md:hidden">
          <Image src={CartLogo} alt="" width={32} />
          <div onClick={() => setIsModalToggle((prev) => !prev)}>
            <Image src={UserLogo} alt="" width={32} />
          </div>
        </div>
        {/* Mobile Navigation Ends Here*/}

        {/* Desktop Navigation */}
        <div className="gap-2 hidden md:flex ">
          {/* // if the user is not logged in */}
          <Image src={CartLogo} alt="" width={32} />
          {!session?.user ? (
            <>
              <Link href="/login" className="">
                Login
              </Link>
              <Link href="/signup">signup</Link>
            </>
          ) : (
            <div
              className="flex items-center justify-center gap-2 relative"
              ref={ref}
            >
              {isDesktopModalToggle && <DesktopModal />}
              {/* <Image src={CartLogo} alt="" width={32} /> */}
              <h1 className="font-semibold">{session?.user.name}</h1>
              <Image
                src={session?.user.image ? session?.user.image : UserLogo}
                width={43}
                height={43}
                className="rounded-full"
                alt=""
                onClick={(e) => setIsDesktopModalToggle((prev) => !prev)}
              />
            </div>
          )}
        </div>
        {/* <div className="flex gap-2 ">
          <Link href="/login" className="">
            Login
          </Link>
          <Link href="/signup">signup</Link>
        </div> */}
      </nav>
      {isModalToggle && !session && <NotAuthMobileModal handleModal={HandleModalToggle} />}
      {isModalToggle && session && <MobileAuthModal handleModal={HandleModalToggle} />}
    </>
  );
};

export default Navbar;
