"use client";
import HelperFunctions from "@/app/services/Helpers";
import { LocationService } from "@/app/services/LocationService";
import { setUserLocation } from "@/app/state/slices/location-slice";
import { LocationState, RootState, Address } from "@/app/types";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Location = () => {
  
  //#region Variables

  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);
  const [localStorageLocation, setLocalStorageLocation] =
    useState<LocationState | null>(null);
  const reduxStoreLocation = useSelector((state: RootState) => state.location);
  const dispatch = useDispatch();

  //#endregion

  //#region Methods & Helper Functions

  const getActiveLocation = () => {
    return (
      reduxStoreLocation?.userLocation || localStorageLocation?.userLocation
    );
  };

  //#endregion

  //#region Hooks

  // First Check localStorage
  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      setLocalStorageLocation(JSON.parse(storedLocation));
    }
    setHasCheckedStorage(true);
  }, []); 

  useEffect(() => {
    if (!hasCheckedStorage) return; // Don't proceed until localStorage has been checked

    const shouldFetchLocation =
      !localStorageLocation ||
      Date.now() - (localStorageLocation.lastFetched as number) >= 1800000;

    if (shouldFetchLocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const locationRequest = await LocationService.fetchLocation(
            position.coords
          );
          if (locationRequest?.data) {
            const fetchedLocation: Address = {
              city: locationRequest.data.city,
              state: locationRequest.data.state,
            } as Address;
            dispatch(setUserLocation(fetchedLocation));
          }
        } 
        catch (error) {
          console.error("Error fetching location:", error);
        }
      });
    }
  }, [hasCheckedStorage, localStorageLocation, dispatch]);

  //#endregion

  return (
    <>
      {HelperFunctions.formatLocation(getActiveLocation()) != "..." &&
        <div className="h-[90%] flex p-[10px] hover-border text-white items-center justify-between select-none">
          <>
            <MapPin className="mr-1 " />
          </>
          <div>
            <div className="text-[#cccccc] text-[12px] font-12px">
              {HelperFunctions.formatLocation(getActiveLocation()) != "..."
                ? "Deliver to"
                : "Checking for location"}
            </div>
            <div className="text-[14px] leading-[1] whitespace-nowrap">
              {HelperFunctions.formatLocation(getActiveLocation())}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Location;
