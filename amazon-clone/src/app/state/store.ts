import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slices/location-slice";
import userReducer from './slices/auth-slice'; 

export const appStore = configureStore({
    reducer: {
        location: locationReducer,
        user: userReducer,
      },
    middleware: (getDefaultMiddleWare) => 
    getDefaultMiddleWare()
});

export default appStore; 
export type StateDispatch = typeof appStore.dispatch; 
export type RootState = typeof appStore.getState; 