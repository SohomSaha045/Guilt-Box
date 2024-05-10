"use client";

import Loader from "@/loader";
import Image from "next/image";
import hand from "@/../../public/left-solid.svg";
import write from "@/../../public/marker-solid.svg";
import G from "@/../../public/giphy-ezgif.com-resize.gif";
import send from "@/../../public/paper-plane-solid.svg";
import { useEffect, useState, useContext } from "react";
import AppContext from "@/context";
import axios from "axios";
import Link from "next/link";
import { navigateToComments } from "@/utils/actions";

interface parameter {
  params: {
    id: string;
  };
}
interface com {
  _id: string;
  name: string;
  message: string;
}

export default function Home(obj: parameter) {
  const [loading, isLoading] = useState(false);

  const [comment, setComments] = useState([]);
  const [mess, setMessage] = useState("");
  const [display, setDisplay] = useState("");
  const [t, setText] = useState("");
  const fetchMessage = async () => {
    try {
      const res = await axios.put(
        "http://localhost:3000/message",
        {
          messageId: obj.params.id,
        },
        {
          withCredentials: true,
        }
      );
      setText("");
      // window.location.reload();
      console.log(res.data.data.data[0].message);
      setMessage(res.data.data.data[0].message);
    } catch (e) {
      alert(e);
    }
  };
  const postComment = async () => {
    if (t == "") {
      alert("Empty comment");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/comments",
        {
          id: obj.params.id,
          comment: t,
        },
        {
          withCredentials: true,
        }
      );
      setText("");
      window.location.reload();
    } catch (e) {
      alert(e);
    }
  };
  const fetchComments = async () => {
    const res = await axios.put(
      "http://localhost:3000/comments",
      {
        id: obj.params.id,
      },
      {
        withCredentials: true,
      }
    );

    console.log(res.data.data);
    setComments(res.data.data);
  };
  useEffect(() => {
    // isLoading(true);
    fetchComments();
    fetchMessage();
    // setTimeout(async () => {
    // isLoading(false);
    // Hide loader after timeout
    // }, 5000);
  }, []);
  console.log(obj.params.id);
  const context = useContext(AppContext);

  return (
    // bg-gradient-to-r from-violet-500 to-fuchsia-500
    <div
      className="flex min-h-screen flex-row   p-0 
      bg-gradient-to-r from-[#fdfcfb] to-[#e2d1c3]"
    >
      
      {loading == true ? (
        <div className="h-full  m-auto justify-center">
          <Loader></Loader>
        </div>
      ) : (
        <>
          <div className="h-screen w-[60%]  m-0 flex flex-col">
            <div className="h-[55%] bg-blue-200 mt-16 mx-8 border-2 border-black rounded-md p-4 font-[600] outline shadow-inner shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-auto p-6 ">
              {/* <div>{context.message}</div> */}
              <div>{mess}</div>
              <div className="flex text-right items-end bottom-0 mt-4 p-0 width-auto ">
                <h2 className="ml-auto mr-0 p-2">- Anonymous</h2>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row m-8 justify-center items-center">
                <div className="flex flex-row justify-center items-center text-lg font-[800] mx-4 py-2 px-4 bg-red-400 rounded-lg border-[3px] border-black hover:cursor-pointer">
                  <Link href="/messages" className="flex flex-row">
                    <Image
                      src={hand}
                      alt="makrer"
                      className="h-[20px]  w-[20px] mr-2"
                    ></Image>
                    See all Confession
                  </Link>
                </div>
                <div className="flex flex-row justify-center items-center text-lg font-[800] mx-4 py-2 px-4 bg-red-400 rounded-lg border-[3px] border-black hover:cursor-pointer ">
                  <Link href="/write" className="flex flex-row">
                    <Image
                      src={write}
                      alt="makrer"
                      className="h-[20px]  w-[20px] mr-2"
                    ></Image>
                    Wirte a Confession
                  </Link>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center p-8">
                <Image src={G} alt="Loading...." className="rounded-md"></Image>
                {/* <Image src={G} alt="Loading...." className=""></Image> */}
              </div>
            </div>
          </div>
          <div className=" flex flex-col w-[45%] h-screen h-32">
            <div className="h-[78%] overflow-auto">
              <div className="p-4 font-[800] mt-8 mb-4">{`Comments (${comment.length})`}</div>
              {comment.map((item: com) => {
                const message: string = item.message;
                // const message: string = mess;
                return (
                  <div
                    className="p-2  m-4 bg-blue-300 rounded-md border-[2px] font-[600] border-black"
                    key={item._id}
                  >
                    {message}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-row m-4 rounded-md ">
              <div className="w-[90%] h-[50px] bg-red-400 p-2 mr-2   border-[2px] font-[600] border-black justify-center items-center rounded-md">
                <input
                  type="text"
                  className="w-full h-full justify-center items-center m-0 p-0 bg-red-400 focus:outline-none "
                  onChange={(e) => setText(e.target.value)}
                ></input>
              </div>
              <div
                className="w-[10%]  flex  items-center justify-center hover:cursor-pointer "
                onClick={postComment}
              >
                <Image
                  src={send}
                  alt="Post"
                  className="h-[30px] w-[30px]"
                ></Image>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}