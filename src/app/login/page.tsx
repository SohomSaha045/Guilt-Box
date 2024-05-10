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
  const fetchCollege = async () => {
    const col: any = await axios.get(
      "http://localhost:3000/login"
    );
    console.log(col.data);
    // setCollege(col.data);
    // const me:any =await axios.get("http://localhost:3000/messages");
    // console.log(me);
  };
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
          <div className="flex flex-row h-[30%] w-full items-center justify-center">
            <div className="">
              <Image
                src={imposter}
                alt="Imposter"
                className="inline h-full"
              ></Image>{" "}
            </div>
            <div className="text-[90px] font-[600] font-mono inline pt-6 pl-6  text-black">
              {" "}
              YOUR INSTITUTE
            </div>
          </div>
          <div className="flex flex-row w-full justify-around items-center p-8 mt-0 h-[70%]">
            <div className="p-8 m-0  items-center justify-around my-auto">
              <Image
                src={doodle}
                alt="among-doodle"
                className="h-[280px]"
              ></Image>
            </div>
            <div className=" h-[100%] w-[32%]  p-0 m-0">
              <LoginForm college={college}></LoginForm>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
