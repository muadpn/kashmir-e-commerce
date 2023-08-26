import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/components/providers/providers";
import ToasterContext from "@/context/ToasterContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Authentication",
  description: "Authentication application Using Nextjs Framework",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`px-1 md:px-4 lg:px-12 xl:px-16 bg-[#EBEBEB] dark:bg-slate-950  dark:text-white  ${inter.className}`}
      >
        <Provider>
          <ToasterContext />
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
