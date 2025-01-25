"use client";

import { ReactNode } from "react";

export default function NavButton(props: { children: ReactNode }) {
  return (
    <>
      <span className="select-none cursor-pointer w-[135px] h-[90%] flex flex-shrink-0 whitespace-nowrap flex-col p-[10px] text-[12px] hover-border text-white items-start justify-start font-emberThin">
        {props?.children}
      </span>
    </>
  );
};

