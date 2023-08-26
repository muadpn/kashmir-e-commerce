import React, { useEffect, useRef } from "react";
import UserLogo from "@/assets/Images/UserLogo.png";
import Wishlist from "@/assets/Images/heart.svg";
import LogoutIcon from "@/assets/Images/Logout.svg";
import Image from "next/image";
import DesktopModalCards from "./DesktopModalCards";
const DesktopModal = ({HandleSignOut}) => {
  const ProfileOptions = [{
    Title:"Change Password",
    url:'/profile/change-password',
  },{
    Title:"View Orders",
    url:'/orders',
  },{
    Title:"Update Address",
    url:'/profile/update-address',
  }]
  // const ref = useRef()
    // useEffect(() => {
    //   addEventListener("click")
    
    //   return () => {
    //     second
    //   }
    // }, [third])
    
  return (
    <div className="absolute max-w-[300px] min-w-[300px] top-12 right-0 p-3 bg-[#c1c0c0] dark:bg-slate-900  dark:text-white rounded-3xl">
      <div className="bg-white dark:bg-slate-950  dark:text-white rounded-xl p-6">
        <DesktopModalCards 
        title="My Profile"
        image={UserLogo}
        options={ProfileOptions}
        />
        <DesktopModalCards 
         title="Wishlist"
         image={Wishlist}
        />
        <DesktopModalCards 
         title="Logout"
         image={LogoutIcon}
         IsSignout={true}
        />
      </div>
    </div>
  );
};

export default DesktopModal;
// bg-[#E2E2E2]

{
  /* <div className="flex gap-2 flex-col">
<div className="flex flex-col gap-x-2 px-4">
    <Image
      src={UserLogo}
      alt=""
      width={28}
      height={28}
      className=""
    />
  <div className="items-end flex gap-x-2 px-4">
    <h1 className="font-bold text-xl">My Profile</h1>
  </div>
  <div className="flex items-center justify-center">
    <p>hello</p>
  </div>
</div>
<div className="h-[1px] bg-black mx-4"></div>
{/* <hr className="bg-black" /> */
}
// </div> */}
