"use client";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/utils/cn";
import axios from "axios";
import { redirect } from "next/navigation";
import Link from "next/link";


import { navigateToLogin } from "@/utils/actions";

interface collegeList {
  name: string;
  _id: string;
  __v: number;
}
export function SignupFormDemo(props: any) {
  const [collegeName, setCollegeName] = useState("");
  const [mail, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    if(!mail || !name || !password){
      return;
    }
    if(collegeName!=="0"){
      college.map((e:collegeList)=>{
        if(e._id==collegeID){
          setCollegeName(e.name)
          console.log(e.name);
          console.log(collegeID);
        }
      })
    }
    console.log(collegeName);
    try{
    const data = await axios.post("https://guilt-box-api.vercel.app/signUp", {
      email: mail,
      name: name,
      password: password,
      id: collegeID,
      collegeName: collegeName,
    });
    console.log(data);
    alert('Sign-Up succesfull')
    navigateToLogin();
    }
    catch(err){
      console.log(err);
      alert('Something went Wrong');

    }
  };

  const [collegeID, setCollegeID] = useState("#");
  const handleSelectChange = (event: any) => {
    setCollegeID(event.target.value);
    college.filter((e:collegeList)=>{
      if(e._id==collegeID){
        setCollegeName(e.name)
        
      }
    })
    console.log(collegeName);
  
  };
  const change = () => {
    redirect("/login");
  };
  useEffect(() => {
    // isLoading(true);
    fetchCollege();
    
  }, []);
  const fetchCollege = async () => {
    const col: any = await axios.get(
      "https://guilt-box-api.vercel.app/colleges"
    );
    setCollege(col.data);
  };
  const [college, setCollege] = useState([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-lg md:rounded-2xl shadow-input p-4 md:p-6 dark:bg-black border-2 border-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome _IMPO$TER.
      </h2>
      <form className="" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4 mt-2">
          <Input
            id="name"
            placeholder="Enter Anonymous User Name"
            type="text"
            onChange={(e)=>{setName(e.target.value)}}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4 ">
          <Input
            id="email"
            placeholder="Enter Email"
            type="email"
            className=""
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4 ">
          <Label htmlFor="email">College Name</Label>
          {/* <Input id="email" placeholder="userEmail@fc.com" type="email" className="" /> */}
          <select
            id="countries"
            className=" bg-inherit border border-black text-gray-900 text-sm rounded-lg focus:border-black block w-full p-2.5   "
            value={collegeID}
            onChange={handleSelectChange}
          >
            <option value="$">Choose an Institute</option>
            {college.map((item: collegeList) => {
              // console.log(item);
              let n = item.name;
              let id = item._id;
              return <option value={id} key={n} >{n}</option>;
            })}
            <option value="0">Others</option>

            {/* <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>  */}
          </select>
        </LabelInputContainer>
        {collegeID === "0" ? (
          <LabelInputContainer className="mb-4 ">
            <Input
              id="InstituteName"
              placeholder="Enter Institute Name"
              type="text"
              className=""
              onChange={(e)=>{setCollegeName(e.target.value)}}
            />
          </LabelInputContainer>
        ) : (
          <></>
        )}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" 
          onChange={(e)=>{
            setPassword(e.target.value);
          }}/>
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 text-lg font-300 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mb-4"
          type="button"
          onClick={signUp}

        >
          Sign up &rarr;
          <BottomGradient />
        </button>
        <Link href="/login">
          <button
            className="bg-transparent border-2 border-black relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-black text-bold text-lg rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] "
            type="button"
          >
            Login
          </button>
        </Link>
      </form>
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
