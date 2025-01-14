"use client";

import { useState } from "react";
import "../../styles/globals.css";
import Link from "next/link";

const Orders = () => {
  
  //#region Variables

  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false); 
  
  //#endregion

  //#region Methods & Helper Functions

  //#endregion

  //#region Hooks

  //#endregion

  return (
    <Link href={isUserSignedIn ? "/orders" : "/sign-in"}>
      <span className="select-none w-[100px] h-[90%] flex flex-col p-[10px] text-[12px] hover-border text-white items-start justify-start cursor-pointer font-emberThin">
        Returns
        <div className="text-[14px] leading-[1] font-ember whitespace-nowrap">
          & Orders
        </div>
      </span>
    </Link>
  );
};

export default Orders;
