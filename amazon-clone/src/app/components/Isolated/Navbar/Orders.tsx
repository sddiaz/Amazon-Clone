"use client";

import Link from "next/link";
import { useState } from "react";
import "../../../styles/globals.css";

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
        <div className="leading-[1] whitespace-nowrap heading">
          & Orders
        </div>
      </span>
    </Link>
  );
};

export default Orders;
