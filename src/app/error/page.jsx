"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

const Page = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get("Message");
  toast.error(message);
  const router = useRouter();

  return (
    <div className="w-full h-[100vh] grid place-items-center text-3xl font-bold  text-black-500"></div>
  );
};

export default Page;
