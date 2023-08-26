import Image from "next/image";
import group from "@/assets/Images/Group.png";

const Images_4 = () => {
  return (
    <div className="py-3">
      <Image src={group} alt="" width={550} height={550} className="pt-4 max-w-xs xl:max-w-md" />
    </div>
  );
};

export default Images_4;
