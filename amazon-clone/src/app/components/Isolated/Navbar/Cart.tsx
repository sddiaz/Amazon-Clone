"use client";

import "../../../styles/globals.css";
import { ShoppingCart } from "lucide-react";

const Cart = (props: { size: number }) => {

  //#region Variables

  //#endregion

  //#region Methods & Helper Functions

  //#endregion

  //#region Hooks

  //#endregion

  return (
    <span className="w-[60px] h-[90%] flex flex-col p-[10px] text-[12px] hover-border text-white items-start justify-start cursor-pointer font-emberThin font-bold">
        <div className="flex justify-center items-center">
            <ShoppingCart /> 
            <span className="text-[var(--amazonOrange)]">{props?.size != 0 ? props?.size : ""}</span>
        </div>
      <div className="text-[14px] font-ember">
        Cart
      </div>
    </span>
  );
};

export default Cart;
