"use client";

import Image from "next/image";
import Link from "next/link";
import AmazonLogo from "../../../../../public/amazon-logo.png";

const Logo = () => {
  return (
    <>
      <div className="flex-shrink-0 w-[120px] h-[90%] p-[10px] hover-border">
        <Link href={"/"}>
          <Image src={AmazonLogo} alt="Amazon Logo" width={100} height={40} />
        </Link>
      </div>
    </>
  );
};

export default Logo;
