"use client";

import { useState } from "react";
import "../../styles/globals.css";
import { ChevronDown } from "lucide-react";

const Greeting = () => {

  //#region Variables

  const [selectedDepartment, setSelectedDepartment] = useState(0);

  //#endregion

  //#region Methods & Helper Functions

  //#endregion

  //#region Hooks

  //#endregion

  return (
    <span className="cursor-pointer w-[135px] h-[90%] flex flex-shrink-0 whitespace-nowrap flex-col p-[10px] text-[12px] hover-border text-white items-start justify-start font-emberThin">
      <span className="whitespace-nowrap">Hello, sign in</span>
      <div className="text-[14px] leading-[1] font-ember flex items-center justify-center">
      <span className="whitespace-nowrap">Account & Lists</span>
        <ChevronDown size={15}/>
      </div>
    </span>
  );
};

export default Greeting;
