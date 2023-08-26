import mail from "@/assets/Images/Mail.png";
import whatsApp from "@/assets/Images/whatsapp.png";
import Instagram from "@/assets/Images/Instagram.png";
import Image from "next/image";
import ConnectRefference from "@/components/Connect/ConnectRefference";
const Footer = () => {
  return (
    <div>
      <h1 className="font-bold text-4xl">Connect with Us</h1>
      <div>
        <div className="py-4">
          <ConnectRefference image={mail} url="mailto:faizan@gmail.com" text="faizan@gmail.com" />
          <ConnectRefference image={whatsApp} url="wa.link/ktlgxc" text="8082953513" />
          <ConnectRefference image={Instagram} url="https://instagram.com/fjz_7?igshid=MzRlODBiNWFlZA==" text="Faizan Javied" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
{
  /* <h1 className="font-bold text-4xl">Connect with Us</h1> */
}
{
  /* <Image src={mail} alt="" /> */
}
{
  /* <a target="_blank" href="mailto:faizan@gmail.com" rel="noreferrer">faizan@gmail.com</a> */
}
{
  /* <Image src={whatsApp} alt="" /> */
}
{
  /* <a href="wa.link/ktlgxc">8082953513</a> */
}
{
  /* <Image src={Instagram} alt="" /> */
}
{
  /* <a href="https://instagram.com/fjz_7?igshid=MzRlODBiNWFlZA==">Faizan Javied</a> */
}
