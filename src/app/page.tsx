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
    const col: any = await axios.get("https://guilt-box-api.vercel.app/colleges");
    console.log(col.data);
    setCollege(col.data);
    
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
          <div className="flex flex-row h-auto w-full items-center justify-center">
            <div className="">
              <Image
                src={imposter}
                alt="Imposter"
                className="inline h-full"
              ></Image>{" "}
            </div>
            <div className="text-[90px] font-[600] font-mono inline pt-4 pl-6 m-2 text-black">
              {" "}
              YOUR INSTITUTE
            </div>
          </div>
          <div className="flex flex-row w-full justify-around items-center p-8 mt-0">
            <div className="p-8 m-0  items-center justify-around my-auto">
              <Image
                src={doodle}
                alt="among-doodle"
                className="h-[280px]"
              ></Image>
            </div>
            <div className=" h-auto w-[32%]  p-0 m-0">
              <SignupFormDemo college={college}></SignupFormDemo>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
