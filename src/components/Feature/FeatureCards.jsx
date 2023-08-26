import Images_8 from "./Images_8";
import Images_4 from "./Images_4";

function FeatureCards({ title, Discription, images }) {
  const IMAGE_CHECKER = 1;
  return (
    <>
      <div className="first-of-type:mt-7 bg-[#F2F2F2] dark:bg-slate-950  dark:text-white   flex flex-col md:flex-row md:even:flex-row-reverse border-2 border-gray-200 shadow-inner rounded-2xl p-2 md:p-8 items-center justify-around  ">
        <div className="">
          {/* Title And Discription */}
          <div className="">
            <h3 className="font-bold text-lg">{title}</h3>
          </div>
          <div>
            <p className="text-base leading-snug">{Discription}</p>
          </div>
        </div>
        {/* Images */}
        {images.length === IMAGE_CHECKER ? (
          <Images_4 images={images} />
        ) : (
          <Images_8 images={images} />
        )}
      </div>
    </>
  );
}
export default FeatureCards;
