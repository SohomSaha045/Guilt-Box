"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "@/loader";
import Image from "next/image";
import imposter from "../../../public/Imposter.png";
import doodle from "../../../public/doodle.png";
import { Input } from "@/component/ui/input";
import { LoginForm } from "@/component/loginForm";
export default function Home() {
  const [loading, isLoading] = useState(false);
  const [college, setCollege] = useState();
  
  useEffect(() => {
    isLoading(true);
    // fetchCollege();
    setTimeout(async () => {
      isLoading(false);
      // Hide loader after timeout
    }, 5000);
  }, []);
  return (
    // bg-gradient-to-r from-violet-500 to-fuchsia-500
    <main
      className="flex h-screen flex-col items-center justify-between p-0 
     bg-gradient-to-r from-[#fdfcfb] to-[#e2d1c3]
    
    "
    >
      {loading == true ? (
        <div className="  my-auto justify-center items-center">
          <Loader></Loader>
        </div>
      ) : (
        <div className="flex flex-col w-full h-screen">


          <div className="flex flex-col md:flex-row lg:flex-row max-h-auto min-h-[220px] w-full items-center justify-center text-wrap">
            <div className="pl-3 pr-3">
              <Image
                src={imposter}
                alt="Imposter"
                className="inline h-[48px] md:h-[50px] lg:h-[84px]"
              ></Image>
            </div>


            <div className="text-[34px] md:text-[44px] lg:text-[84px] font-[400] font-mono inline md:mt-4 lg:mt-6 text-center text-black">
              
              YOUR INSTITUTE
            </div>
          </div>


          <div className="flex flex-row w-full justify-around items-center p-8 mt-0 h-[70%]">
            <div className="p-8 m-0 w-[40%] items-center justify-end my-auto hidden md:flex ld:flex">
              <Image
                src={doodle}
                alt="among-doodle"
                className="h-[280px]"
              ></Image>
            </div>
            <div className=" h-[100%] w-[95%] md:w-[50%] lg:w-[65%]  p-0 m-0">
              <LoginForm college={college}></LoginForm>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
