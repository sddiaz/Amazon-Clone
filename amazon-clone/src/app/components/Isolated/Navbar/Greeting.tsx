"use client";

import { userSelector } from "@/app/state/slices/auth-slice";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../../styles/globals.css";
import Popover from "../Popover/Popover";

const Greeting = () => {

  //#region Variables

  const { user } = useSelector(userSelector);
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  //#endregion

  //#region Methods & Helper Functions

  //#endregion

  //#region Hooks

  useEffect(() => {
    if (user) {
      setIsUserSignedIn(true); 
    }
  }, [user]); 

  //#endregion

  return (
    <div>
      <Popover isUserSignedIn={isUserSignedIn}>
        <Link href={isUserSignedIn ? "/orders" : "/sign-in"} className="relative z-50">
          <span className="select-none cursor-pointer w-[135px] h-[90%] flex flex-shrink-0 whitespace-nowrap flex-col p-[10px] text-[12px] hover-border text-white items-start justify-start font-emberThin">
            <span className="whitespace-nowrap">
              Hello, {user ? user.displayName : "Sign in"}
            </span>
            <div className="leading-[1] flex items-center justify-center heading">
              <span className="whitespace-nowrap">Account & Lists</span>
              <ChevronDown size={15} />
            </div>
          </span>
        </Link>
      </Popover>
    </div>
  );
};

export default Greeting;
