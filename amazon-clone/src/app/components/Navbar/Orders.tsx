"use client";

import { useState } from "react";
import "../../styles/globals.css";

const Orders = () => {

  //#region Variables

  const [selectedDepartment, setSelectedDepartment] = useState(0);

  //#endregion

  //#region Methods & Helper Functions

  //#endregion

  //#region Hooks

  //#endregion

  return (
    <span className="w-[100px] h-[90%] flex flex-col p-[10px] text-[12px] hover-border text-white items-start justify-start cursor-pointer font-emberThin">
      Returns
      <div className="text-[14px] leading-[1] font-ember whitespace-nowrap">
       & Orders
      </div>
    </span>
  );
};

export default Orders;
