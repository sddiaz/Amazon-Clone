"use client";
import React from "react";
import { setUserLocation } from "@/app/state/slices/location-slice";
import { LocationState, RootState, UserLocation } from "@/app/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapPin } from 'lucide-react';
import { LocationService } from "@/app/services/LocationService";

const Location = () => {


  //#region Variables

  const [isLocationAvailable, setIsLocationAvailable] = useState(false); 
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);
  const [localStorageLocation, setLocalStorageLocation] = useState<LocationState | null>(null);
  const reduxStoreLocation = useSelector((state: RootState) => state.location);
  const dispatch = useDispatch();

  //#endregion

  //#region Methods & Helper Functions

  const getActiveLocation = () => {
    return reduxStoreLocation?.userLocation || localStorageLocation?.userLocation;
  };

  const formatLocation = (location: UserLocation | null | undefined) => {
    if (!location) return "..."; 
    return `${location.city} ${location.state_code} ${location.postcode}`
  }

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

    const shouldFetchLocation = !localStorageLocation ||
      Date.now() - (localStorageLocation.lastFetched as number) >= 1800000;

    if (shouldFetchLocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const locationRequest = await LocationService.fetchLocation(position.coords);
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
          setIsLocationAvailable(false); 
        }
      });
    }
    else {
      setIsLocationAvailable(true); 
    }
  }, [hasCheckedStorage, localStorageLocation, dispatch]);

  //#endregion

  return (
    <div className="h-[90%] flex p-[10px] hover-border text-white items-center justify-between select-none">
      <>
      <MapPin className="mr-1 -mb-3" />
      </>
      <div>
        <div className="text-[#cccccc] text-[12px] font-12px">
          Delivering to
        </div>
        <div className="text-[14px] font-12px leading-[1]">
          {formatLocation(getActiveLocation())}
        </div>
      </div>
    </div>
  );
};

export default Location;
