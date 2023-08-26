// import Navbar from "@/components/navbar";
// @refresh reset
"use client"
import Cta from "@/container/Cta";
import Features from "@/container/Features";
import Footer from "@/container/Footer";
import HeroContainer from "@/container/HeroContainer";
import Image from "next/image";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <header className="py-7 flex flex-col-reverse md:grid md:grid-cols-2 md:place-items-center ">
        <HeroContainer />
      </header>
      <main className="bg-[#F2F2F2] dark:bg-slate-950  dark:text-white  rounded-xl p-2 md:p-10">
        <section>
          {/* <Features /> */}
          <Features />
        </section>
      </main>
      <section className="mt-10">
        <article>
          <Cta />
        </article>
      </section>
      <footer className="my-10">
        <Footer />
      </footer>
    </>
  );
}
