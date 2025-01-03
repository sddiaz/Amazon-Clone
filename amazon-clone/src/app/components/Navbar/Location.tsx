import { FiMapPin } from "react-icons/fi";
import "../../styles/globals.css";
import { useEffect, useState } from "react";
import * as locationAPI from '../../api/location/route'
import { LocationRequestBody } from "@/app/types";

const Location = () => {
  //#region Variables

  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition>();

  //#endregion

  //#region Methods and Hooks

  const fetchLocation = async (location: GeolocationPosition) => {
    const lat = location.coords.latitude;
    const lon = location.coords.longitude;

    try {
      // Call the custom API route
      const requestBody: LocationRequestBody = {
        lat: lat,
        lon: lon
      }
      const response = await locationAPI.GET(requestBody)
      const data = await response?.json();
      console.log("Location data from custom API:", data); // Process the response
    } catch (error) {
      console.error("Error calling custom API:", error);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition((location) => {
        setCurrentLocation(location);
      });
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
