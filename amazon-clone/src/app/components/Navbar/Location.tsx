"use client";

import { FiMapPin } from "react-icons/fi";
import "../../styles/globals.css";
import { useEffect, useState } from "react";

const Location = () => {

    //#region Variables

    const [currentLocation, setCurrentLocation] = useState<GeolocationPosition>();

    //#endregion

    //#region Methods and Hooks

    const fetchLocation = async(location: GeolocationPosition) => {
       
    }

    useEffect(() => {
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition((location) => {
                setCurrentLocation(location);
            })
        }
    }, []);

    useEffect(() => {
        // Fetch data from API if `location` object is set
        if (currentLocation) {
            fetchLocation(currentLocation); 
        }
    }, [currentLocation]);

    //#endregion

  return (
    <>
        <div className="h-[90%] flex p-[10px] hover-border text-white items-center justify-between select-none">
          <>
            <FiMapPin className="mr-1 -mb-3" />
          </>
          <div>
            <div className="text-[#cccccc] text-[12px] font-12px">
              Deliver to {}
            </div>
            <div className="text-[14px] font-12px leading-[1]">
              Rogers AR 72758
            </div>
          </div>
        </div>
    </>
  );
};

export default Location;
