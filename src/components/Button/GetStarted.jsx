
const GetStarted = ({title, className}) => {
  return (
    <button className="bg-[#3E3A3A] rounded-md px-4 py-2 max-w-fit dark:bg-white  dark:text-black">
        <p className={`text-white font-medium dark:text-black whitespace-nowrap`} > {title ? title : "Get Started" }</p>
      </button>
  )
}

export default GetStarted
