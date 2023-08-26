import { signOut } from "next-auth/react";
import { Router } from "next/navigation";
import { toast } from "react-hot-toast";

export const HandleSignOut = async () => {
    const router= useRouter
    try {
      await signOut();
      toast.success("Logged Out");
      setTimeout(() => {
        Router.push("/store");
      }, [200]);
    } catch (error) {
      console.log(error);
    }
  };