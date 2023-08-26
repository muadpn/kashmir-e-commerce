import Image from "next/image";
import { mat, boat, chairShawl, saffron } from "../../assets/Images/index";

const HeroImage = () => {
  return (
    <>
      <div className="grid grid-flow-col place-content-center relative right-8">
        <div>
          <Image
            src={saffron}
            alt=""
            className="w-60 h-48 rounded-tl-3xl rounded-br-3xl relative left-16 z-[1]"
          />
          <Image
            src={mat}
            alt=""
            className="w-60 h-48  bottom-10 relative left-16 z-[0] rounded-tl-[4rem] rounded-br-[8rem]"
          />
        </div>
        <div>
          <Image
            src={chairShawl}
            alt=""
            className="w-60 h-48 rounded-bl-[4rem] rounded-tr-3xl z-[4] relative"
          />
          <Image
            src={boat}
            alt=""
            className="w-60 h-48 relative bottom-10 z-[3] rounded-br-3xl"
          />
        </div>
      </div>
    </>
  );
};

export default HeroImage;
