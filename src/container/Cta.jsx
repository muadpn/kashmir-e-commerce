import GetStarted from "@/components/Button/GetStarted"
const Cta = () => {
  return (
    <div className="bg-[#F2F2F2] dark:bg-slate-950  dark:text-white border-2 border-white dark:border-2 my-2 p-5 md:px-16 md:p-8 mt-8 lg:p-12 lg:px-20 md:flex items-center justify-between rounded-xl lg:mt-12">
      <div className=" p-5 lg:text-xl">
        <p className="">Request Early Acess to Get Started</p>
        <h1 className="font-semibold text-xl md:text-2xl">
          Exclusive Access Coming Soon: Join Our Waiting List!
        </h1>
      </div>
      <div className="mt-2">
        <GetStarted title="Get Early Access" className="" />
      </div>
    </div>
  );
};

export default Cta;
