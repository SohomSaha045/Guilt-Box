"use client";
import React, { useContext, useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/utils/cn";
import axios from "axios";
import Link from "next/link";
import Loader from "@/loader";
import { getCookie, setCookie } from "cookies-next";
import { navigate } from '../utils/actions';
import AppContext from "@/context";
export function LoginForm(props: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(AppContext);



  const [loading, isLoading] = useState(false);

  const login = async (e:any) => {
    e.preventDefault();
    // isLoading(true);
    if(!email || !password){
      alert("Email or Password Empty");
      return;
    }
    try {
      const data: any = await axios.post(
        // 'https://guilt-box-api.vercel.app/login'
        "https://guilt-box-api.vercel.app/login",
      // "http://localhost:3000/login",

        // "/login",
        {
          email: email,
          password: password,
        },
        {
          // withCredentials: true
        }
      );

      const cookies = data.headers["cookie"];
   
      var x = cookies.split("=");
      
      setCookie("UserToken", x[1],{
        sameSite:'lax'
      });
      

      console.log(data);

      console.log(email , password);
      alert("Successfully Logged In");
      // console.log(data.json());
      // console.log(res);
      navigate();
      // console.log(data.headers.get());
    } catch (e:any) {
      console.log(e);
      alert(e.response.data.status);
    }
    // isLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input  dark:bg-black border-2 border-black">
      {loading == true ? (
        <div className="h-full  m-auto justify-center">
          <Loader></Loader>
        </div>
      ) : (
        <>
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome _IMPO$TER.
          </h2>
          <form className="h-full" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4 ">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="userEmail@fc.com"
                type="email"
                className=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </LabelInputContainer>
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 text-lg font-300 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mb-4"
              type="button"
              onClick={login}
            >
              Login &rarr;
              <BottomGradient />
            </button>
            <Link href="/">
              <button
                className="bg-transparent border-2 border-black relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-black text-bold text-lg rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] "
                type="submit"
              >
                Sign Up
              </button>
            </Link>
          </form>
        </>
      )}
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
