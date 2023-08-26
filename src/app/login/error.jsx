"use client"

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Error = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get("Message");
  toast.error(message);
  const router = useRouter();
  setTimeout(() => {
    router.push("/login");
  }, [2000]);
  return (
    <div>THIS IS ERROR</div>
  )
}

export default Error