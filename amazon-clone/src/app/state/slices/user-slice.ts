import { RootState, UserState } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";

/* Initial State */
const initialState: UserState = {
  userData: null,
};

/* Slice */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
    },
  },
});

export const { setUserData, clearUserData } = authSlice.actions;
export default authSlice.reducer;

/* Selectors */
export const userDataSelector = (state: RootState) => state.userData;
