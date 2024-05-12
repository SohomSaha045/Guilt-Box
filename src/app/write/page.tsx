"use client";

import Loader from "@/loader";
import Image from "next/image";
import smile from "../../../public/emoji-smile.svg";
import post from "@/../../public/paper-plane-solid.svg";
import { useState } from "react";
import Picker from "emoji-picker-react";
import axios from "axios";
import { navigate } from '../../utils/actions';
import { getCookie } from "cookies-next";



export default function Home() {
  const [inputStr, setStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const onEmoji = (emojiData: any, event: any) => {
    setStr((prevInput) => prevInput + emojiData.emoji);
    // setShowPicker(false);
  };
  const submit=async (e:any)=>{
    e.preventDefault();
    if(!inputStr){
      alert("Message Box Empty !!!");
      return;
    }
    try{
      const d = getCookie("UserToken");
      const data:any= await axios.post(
        "https://guilt-box-api.vercel.app/messages",
        // "http://localhost:3000/messages",
        {
          'message': inputStr
        },
        {
          withCredentials: true,
          headers: {
            'Authorization': `${d}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Message Posted !!!");

      navigate();

      
    }catch(e:any){
      alert(e);
    }
  }
  
  var text: string =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, illum ex. Voluptates eveniet impedit architecto soluta eius temporibus culpa suscipit explicabo quis similique iste pariatur possimus quam, ratione laborum est magni exercitationem deserunt consequatur vero. Placeat, cupiditate magni incidunt provident distinctio autem? Enim, architecto veritatis eos sunt alias officia assumenda.";
  return (
    // bg-gradient-to-r from-violet-500 to-fuchsia-500
    <div
      className="flex min-h-screen flex-col items-center  p-0 
      bg-gradient-to-r from-[#fdfcfb] to-[#e2d1c3]"
    >
      <div className=" flex flex-col h-[60%] w-[100%]  justify-center m-0 p-12 pb-0">

        <div className=" w-auto m-auto p-0 text-[34px] md:text[40px] lg:text-[60px] font-[900] text-center">
          Guilt-Box 🔥
        </div>

        <div className="m-auto max-w-[90%] pt-8 font-semibold text-[17px] text-center">
          Welcome to Guilt-Box, the ultimate platform where you can liberate
          your secrets, and stories about your Organization. <br /> Whether you
          have a deep, dark confession on your mind or a heartwarming tale
          you're itching to share, <br />
          Guilt-Box provides a safe and anonymous space for you. <br></br>
          <span className="text-[22px]">🤫🤫🤫</span>
        </div>
      </div>


      <div className="relative flex flex-row w-[100%] justify-center">
        <div className=" realtive flex flex-col h-auto m-6  w-[80%] bg-blue-400 rounded-lg border-black border-2 ">
          <textarea
            className="h-full w-[100%] bg-blue-400 focus:outline-none p-4 text-[16px] font-[400] rounded-lg z-10"
            value={inputStr}
            onChange={(e) => setStr(e.target.value)}
            rows={10} cols={40}
            
          />
          {showPicker && (
            <div className="absolute left-5 bottom-[100px] z-50">
               <Picker onEmojiClick={onEmoji} className="" />
            </div>
           
          )}
          <div className="relative h-[10%] flex flex-row items-center justify-between pl-6 pr-6 mb-6">

            <Image src={smile}  alt="Emoji" className=" h-[40px] w-[40px] m-2 p-1 hover:cursor-pointer " onClick={() => setShowPicker((val) => !val)}></Image>
            <Image src={post} alt="POST" className=" h-[40px] w-[40px] m-2 p-1 hover:cursor-pointer " onClick={submit} ></Image>
          </div>
          
        </div>
      </div>


    </div>
  );
}
