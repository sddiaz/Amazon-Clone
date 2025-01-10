import Image from "next/image";
import Link from "next/link";
import AmazonLogo from "../../../../public/amazon-logo.png";
import "../../styles/globals.css";
import Greeting from "./Greeting";
import Location from "./Location";
import SearchBar from "./SearchBar";
import Orders from "./Orders";
import Cart from "./Cart";

const Navbar = () => {

  return (
    <>
      {/* Top Section */}
      <div className="p-[1px_8px_0px_6px] top-0 w-full h-[60px] bg-[var(--darkBlue)] flex items-center font-ember text-white ">
        {/* Amazon Logo */}
        <div className="flex-shrink-0 w-[120px] h-[90%] p-[10px]  hover-border">
          <Link href={"/"}>
            <Image src={AmazonLogo} alt="Amazon Logo" width={100} height={40} />
          </Link>
        </div>
        {/* Location */}
        <Location />
        {/* Search Bar */}
        <SearchBar />
        {/* Greeting */}
        <Greeting />
        {/* Returns and Orders */}
        <Orders />
        {/* Cart */}
        <Cart />
      </div>

      {/* Bottom Section */}
      <div className="w-full h-[39px] bg-[var(--amazonBlue)]"></div>
    </>
  );
};

export default Navbar;
