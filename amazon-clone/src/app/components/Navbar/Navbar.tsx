"use client";

import Image from "next/image";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi";
import AmazonLogo from "../../../../public/amazon-logo.png";
import "../../styles/globals.css";

const Navbar = () => {
  return (
    <>
      {/* Top Section */}
      <div className="p-[1px_8px_0px_6px] top-0 w-full h-[60px] bg-[var(--darkBlue)] flex items-center font-ember text-white ">
        {/* Amazon Logo */}
        <div className="h-[90%] p-[10px]  hover-border">
          <Link href={"/"}>
            <Image src={AmazonLogo} alt="Amazon Logo" width={100} height={40} />
          </Link>
        </div>
        {/* Location */}
        <div className="h-[90%] flex p-[10px] hover-border text-white items-center justify-between">
          <FiMapPin className="mr-1" />
          <div>
            <div className="text-[#cccccc] text-[12px] font-12px">
              Deliver to {}
            </div>
            <div className="text-[14px] font-12px leading-[1]">
              Rogers AR 72758
            </div>
          </div>
        </div>
        {/* Search Bar */}
        <div></div>
        {/* Language */}
        <div></div>
        {/* Sign In */}
        <div></div>
        {/* Returns and Orders */}
        <div></div>
        {/* Cart */}
        <div></div>
      </div>

      {/* Bottom Section */}
      <div className="w-full h-[39px] bg-[var(--amazonBlue)]"></div>
    </>
  );
};

export default Navbar;
