"use client";

import "../../styles/globals.css";
import { ShoppingCart } from "lucide-react";

const Cart = () => {

  //#region Variables

  //#endregion

  //#region Methods & Helper Functions

  //#endregion

  //#region Hooks

  //#endregion

  return (
    <span className="w-[60px] h-[90%] flex flex-col p-[10px] text-[12px] hover-border text-white items-start justify-start cursor-pointer font-emberThin">
        <div className="flex justify-center items-center">
            <ShoppingCart size={20}/> 
            <span className="text-[var(--amazonOrange)]">2</span>
        </div>
      <div className="text-[14px] font-ember">
        Cart
      </div>
    </span>
  );
};

export default Cart;
