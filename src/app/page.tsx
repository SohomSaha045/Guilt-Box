"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "@/loader";
import { redirect } from "next/navigation";
import Image from "next/image";
import imposter from "../../public/Imposter.png";
import doodle from "../../public/doodle.png";
import { Input } from "@/component/ui/input";
import { SignupFormDemo } from "@/component/form";
export default function Home() {
  const [loading, isLoading] = useState(false);
  const [college, setCollege] = useState();
  const fetchCollege = async () => {
    try {
      const col: any = await axios.get(
        "https://guilt-box-api.vercel.app/colleges"
      );
      console.log(col.data);
      setCollege(col.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // isLoading(true);
    fetchCollege();
    setTimeout(async () => {
      isLoading(false);
      // Hide loader after timeout
    }, 5000);
  }, []);
  return (
    // bg-gradient-to-r from-violet-500 to-fuchsia-500
    <main
      className="flex min-h-screen flex-col items-center justify-between p-0 
     bg-gradient-to-r from-[#fdfcfb] to-[#e2d1c3]
    
    "
    >
      {loading == true ? (
        <div className="h-full  m-auto justify-center">
          <Loader></Loader>
        </div>
      ) : (
        <div className="flex flex-col w-full ">
          <div className="flex flex-col md:flex-row lg:flex-row max-h-auto min-h-[120px] mt-4 md:mt-0 lg:mt-0 w-full items-center justify-center text-wrap">
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

          <div className="flex flex-row w-full justify-around items-center p-8 mt-0">
            <div className="p-8 m-0 w-[40%] hidden md:flex lg:flex items-center justify-end my-auto">
              <Image
                src={doodle}
                alt="among-doodle"
                className="h-[280px]"
              ></Image>
            </div>
            <div className=" h-auto w-[95%] md:w-[50%] lg:w-[65%]  p-0 m-0">
              <SignupFormDemo college={college}></SignupFormDemo>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
