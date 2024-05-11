"use client";

import Loader from "@/loader";
import Image from "next/image";
import comment from "../../../public/comment-solid.svg";
import add from "@/../../public/circle-plus-solid.svg";
import logout from "@/../../public/logout.png";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { navigateToComments } from "@/utils/actions";
import Link from "next/link";
import AppContext from "@/context";
import { LogOut } from "@/utils/logOut";
import { getCookie, setCookie } from "cookies-next";

export default function Home() {
  const context = useContext(AppContext);
  const [loading, isLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const d = getCookie("UserToken");
    const res = await axios.get(
      "https://guilt-box-api.vercel.app/messages",
      // "http://localhost:3000/messages",

      {
        withCredentials: true,
        headers: {
          'Authorization': `${d}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    setMessages(res.data);
  };

  useEffect(() => {
    isLoading(true);
    fetchMessages();
    isLoading(false);
  }, []);

  const showComments = async (id: string) => {
    console.log(id);
    navigateToComments(id);
  };
  return (
    // bg-gradient-to-r from-violet-500 to-fuchsia-500
    <div
      className="flex min-h-screen flex-col items-center  p-0 
      bg-gradient-to-r from-[#fdfcfb] to-[#e2d1c3]"
    >
      {loading == true ? (
        <div className="h-full  m-auto justify-center">
          <Loader></Loader>
        </div>
      ) : (
        <>
          <h2 className="text-[80px] font-[400] font-mono inline pt-6 pl-6  text-black">
            Welcome to GUILT BOX
          </h2>
          <div className="p-32 w-full ">
            <div className="grid gap-12 grid-cols-3 items-center">
              {messages.map((data: any) => {
                var text: string = data.message;
                let id: string = data._id;
                return (
                  <Link
                    href={`/messages/${id}`}
                    onClick={() => {
                      context.setMessage(text);
                    }}
                    key={id}
                  >
                    <div className="h-[200px] w-auto bg-blue-100 border-2 border-black rounded-md p-4 font-[600] outline shadow-inner shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] hover:bg-blue-300 hover:cursor-pointer">
                      <div className="h-[88%]">
                        {text.slice(0, 300) === text
                          ? text
                          : text.slice(0, 236) + " ...Read more"}
                      </div>

                      <div className="h-[12%]">
                        <Image
                          src={comment}
                          alt=""
                          className="h-[20px] w-[20px] ml-auto mr-0"
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="fixed right-[50px] bottom-[50px]">
            <a href="/write" className="">
              <Image src={add} alt="add" className="h-[60px] m-0 p-0 w-auto " />
            </a>
          </div>
          <div className="fixed right-[50px] bottom-[130px]">
            <a href="#" className="" onClick={LogOut}>
              <Image
                src={logout}
                alt="add"
                className="h-[60px] m-0 p-0 w-auto "
              />
            </a>
          </div>
        </>
      )}
    </div>
  );
}
