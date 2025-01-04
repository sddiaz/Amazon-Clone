import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slices/location-slice";

export const appStore = configureStore({
    reducer: {
        location: locationReducer,
      },
    middleware: (getDefaultMiddleWare) => 
    getDefaultMiddleWare()
});

export default appStore; 
export type StateDispatch = typeof appStore.dispatch; 
export type RootState = typeof appStore.getState; 