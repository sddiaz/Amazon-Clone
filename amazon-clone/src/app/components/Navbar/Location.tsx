"use client";
import { getServerSideProps } from "@/app/actions";
import { LocationService } from "@/app/services/LocationService";
import { setUserLocation } from "@/app/state/slices/location-slice";
import { LocationState, RootState, UserLocation } from "@/app/types/types";
import { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const Location = () => {

  //#region Variables

  const [localStorageLocation, setLocalStorageLocation] = useState<LocationState | null>(null);
  const reduxStoreLocation = useSelector((state: RootState) => state.location);
  const dispatch = useDispatch();

  //#endregion

  //#region Hooks 

  useEffect(() => {
    // Access localStorage on mount
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      setLocalStorageLocation(JSON.parse(storedLocation));
    }
  }, []); // Runs only on component mount

  useEffect(() => {
    const shouldFetchLocation =
      !localStorageLocation ||
      Date.now() - (localStorageLocation.lastFetched as number) >= 1800000;

    if (shouldFetchLocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const locationRequest = await LocationService.fetchLocation();
          if (locationRequest?.data) {
            const fetchedLocation: UserLocation = {
              city: locationRequest.data.city,
              country: locationRequest.data.country,
              postcode: locationRequest.data.postcode,
              state: locationRequest.data.state,
              state_code: locationRequest.data.state_code,
            };
            dispatch(setUserLocation(fetchedLocation));
          }
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      });
    }
  }, [localStorageLocation, dispatch]); // Dependency added for localStorageLocation

  //#endregion

  return (
    <div className="h-[90%] flex p-[10px] hover-border text-white items-center justify-between select-none">
      <FiMapPin className="mr-1 -mb-3" />
      <div>
        <div className="text-[#cccccc] text-[12px] font-12px">
          Delivering to
        </div>
        <div className="text-[14px] font-12px leading-[1]">
          {(reduxStoreLocation.userLocation ||
            localStorageLocation?.userLocation) && (
            <>
              {reduxStoreLocation.userLocation?.city ||
                localStorageLocation?.userLocation?.city}{" "}
              {reduxStoreLocation.userLocation?.state_code ||
                localStorageLocation?.userLocation?.state_code}{" "}
              {reduxStoreLocation.userLocation?.postcode ||
                localStorageLocation?.userLocation?.postcode}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Location;
