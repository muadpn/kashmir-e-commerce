"use client";
import Image from "next/image";
//  import matt from "@/assets/Images/matt.jpg";
import { useState, useEffect } from "react";
const Images_8 = ({ images }) => {
  "use client";
  const [windowWidth, setWindowWidth] = useState(0);
  // setWindowWidth(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    // window.addEventListener("DOMContentLoaded",handleWindowResize)
    handleWindowResize();
    
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  },[]);
  return (
    <div className="flex odd:items-start even:items-center lg:p-12 flex-shrink-0 max-w-2xl pt-5 md:pt-0">
      <Image
        src={`/Images/${images[0]}`}
        alt=""
        width={550}
        height={550}
        className="w-20  xl:w-28 xl:h-36 aspect-[1.2/1.5] rounded-2xl p-1"
      />
      <div className="">
        <Image
          src={`/Images/${images[1]}`}
          width={550}
          height={550}
          alt=""
          className="xl:w-28 xl:h-36  w-20  aspect-[1.2/1.5]  rounded-2xl p-1"
        />
        <Image
          src={`/Images/${images[2]}`}
          width={550}
          height={500}
          alt=""
          className="xl:w-28 xl:h-36   w-20  aspect-[1.2/1.5] rounded-2xl p-1"
        />
      </div>
      {windowWidth > 900 && (
        <div className="flex flex-col -space-y-16">
          <div>
            <Image
              src={`/Images/${images[3]}`}
              width={550}
              height={550}
              alt=""
              className="xl:w-28 xl:h-36  w-20  aspect-[1.2/1.5]  rounded-2xl p-1 "
            />
            <Image
              src={`/Images/${images[4]}`}
              width={550}
              height={550}
              alt=""
              className="xl:w-28 xl:h-36  w-20  aspect-[1.2/1.5] rounded-2xl p-1 "
            />
          </div>
          <div></div>
        </div>
      )}
      <div className="">
        <Image
          src={`/Images/${images[5]}`}
          alt=""
          width={550}
          height={550}
          className="xl:w-28 xl:h-36 w-20  aspect-[1.2/1.5]  rounded-2xl p-1"
        />
        <Image
          src={`/Images/${images[6]}`}
          alt=""
          width={550}
          height={550}
          className="xl:w-28 xl:h-36 w-20  aspect-[1.2/1.5] rounded-2xl p-1"
        />
      </div>
      <Image
        src={`/Images/${images[7]}`}
        alt=""
        width={550}
        height={100}
        className="xl:w-28 xl:h-36 w-20   aspect-[1.2/1.5]  rounded-2xl p-1 "
      />
    </div>
  );
};

export default Images_8;
