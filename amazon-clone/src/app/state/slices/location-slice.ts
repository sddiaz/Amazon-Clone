import { LocationState, RootState, UserLocation } from "@/app/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* Initial State */
const initialState: LocationState = {
  userLocation: null as UserLocation | null,
  lastFetched: null as number | null,
};

/* Slice */
const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setUserLocation: (
      state,
      action: PayloadAction<UserLocation | null> // Ensure null is allowed
    ) => {
      state.userLocation = action.payload;
      state.lastFetched = Date.now(); 
      // Save to Local Storage
      localStorage.setItem("userLocation", JSON.stringify({
        userLocation: action.payload, 
        lastFetched: Date.now(), 
      }))
    },
    initializeLocation: (state) => {
      const saved = JSON.parse(localStorage.getItem('userLocation') || "");
      if (saved && typeof saved == 'object' && saved != "") {
        state.userLocation = saved.userLocation; 
        state.lastFetched =  saved.lastFetched;
      }
    }
  },
});

export const { setUserLocation, initializeLocation } = locationSlice.actions;
export default locationSlice.reducer; // Export only the reducer

/* Selectors */
export const locationStateSelector = (state: RootState) => state.location;
