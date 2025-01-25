import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slices/location-slice";
import authReducer from './slices/auth-slice'; 
import userReducer from './slices/user-slice'; 

export const appStore = configureStore({
    reducer: {
        location: locationReducer,
        auth: authReducer,
        user: userReducer, 
      },
    middleware: (getDefaultMiddleWare) => 
    getDefaultMiddleWare()
});

export default appStore; 
export type StateDispatch = typeof appStore.dispatch; 
export type RootState = typeof appStore.getState; 