import FeatureCards from "@/components/Feature/FeatureCards";
import FeatureTitle from "@/components/Feature/FeatureTitle";
import FeaturesData from "@/assets/data/FeaturesDatas";
import { v4 as uuid } from "uuid";
const Features = () => {
  return (
    <>
      <article className="">
        <FeatureTitle />
      </article>
      <article className="">
        <div className="">
          {FeaturesData?.map((item) => {
            return (
              <div key={uuid()}>
                <FeatureCards
                  title={item?.title}
                  Discription={item?.Discription}
                  images={item?.images}
                />
              </div>
            );
          })}
          {/* <FeatureCards/> */}
        </div>
      </article>
    </>
  );
};

export default Features;
