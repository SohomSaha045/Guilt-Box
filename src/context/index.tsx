'use client';
import { createContext, Dispatch,SetStateAction} from "react";

interface IMenuContext {
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
  }

const AppContext=createContext<IMenuContext>({
    message:'',
    setMessage:()=>{}
});

export default AppContext;