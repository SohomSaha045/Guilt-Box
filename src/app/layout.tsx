'use client';
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppContext from "@/context";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [message,setMessage]=useState("");
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContext.Provider value={{message,setMessage}}>
        {children}
        </AppContext.Provider>
        
        
      </body>
    </html>
  );
}
