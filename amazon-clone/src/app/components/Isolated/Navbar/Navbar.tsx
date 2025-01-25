"use client";
import { authInfoSelector } from "@/app/state/slices/auth-slice";
import { RootState } from "@/app/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../../styles/globals.css";
import Cart from "./Cart";
import Greeting from "./Greeting";
import Location from "./Location";
import Logo from "./Logo";
import Orders from "./Orders";
import SearchBar from "./SearchBar";
import BottomBar from "./BottomBar";

const Navbar = () => {

  //#region Variables 

  const pathname = usePathname();
  const [shouldShowNavbar, setShouldShowNavbar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const nonNavPaths = ["/cart", "/sign-in", "/sign-up"];
  const userInfo = useSelector(authInfoSelector); 
  const firebaseUserData = useSelector((state: RootState) => state.user); 
  
  //#endregion

  //#region Methods

  //#endregion

  //#region Hooks

  useEffect(() => {
    const shouldShow = !nonNavPaths.some((restrictedPath) => pathname === restrictedPath);
    setShouldShowNavbar(shouldShow);
    setIsLoading(false);
  }, [pathname]);

  //#endregion

  if (isLoading) {
    return null; // or return a loading skeleton if you prefer
  }

  return (
    shouldShowNavbar && (
      <>
        {/* Top Section */}
        <div className="p-[1px_8px_0px_6px] top-0 w-full h-[60px] bg-[var(--darkBlue)] flex items-center font-ember text-white ">
          {/* Amazon Logo */}
          <Logo />
          {/* Location */}
          <Location />
          {/* Search Bar */}
          <SearchBar />
          {/* Greeting */}
          <Greeting />
          {/* Returns and Orders */}
          <Orders />
          {/* Cart */}
          <Cart size={firebaseUserData?.userData?.cart?.length ?? 0}/>
        </div>

        {/* Bottom Section */}
        <div className="w-full h-[39px] bg-[var(--amazonBlue)] text-white flex justify-between items-center font-ember font-bold">
          <BottomBar /> 
        </div>
      </>
    )
  );
};

export default Navbar;