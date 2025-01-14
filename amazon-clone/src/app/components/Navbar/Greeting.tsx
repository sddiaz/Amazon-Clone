"use client";

import { useEffect, useState } from "react";
import "../../styles/globals.css";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { userSelector } from "@/app/state/slices/auth-slice";
import { useSelector } from "react-redux";

const Greeting = () => {
  
  //#region Variables

  const { user } = useSelector(userSelector); 
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false); 

  //#endregion

  //#region Methods & Helper Functions

  //#endregion

  //#region Hooks

  //#endregion

  return (
    <Link href={isUserSignedIn ? "/orders" : "/sign-in"}>
      <span className="select-none cursor-pointer w-[135px] h-[90%] flex flex-shrink-0 whitespace-nowrap flex-col p-[10px] text-[12px] hover-border text-white items-start justify-start font-emberThin">
        <span className="whitespace-nowrap">Hello, {user ? user.displayName : "Sign in"}</span>
        <div className="text-[14px] leading-[1] font-ember flex items-center justify-center">
          <span className="whitespace-nowrap">Account & Lists</span>
          <ChevronDown size={15} />
        </div>
      </span>
    </Link>
  );
};

export default Greeting;
