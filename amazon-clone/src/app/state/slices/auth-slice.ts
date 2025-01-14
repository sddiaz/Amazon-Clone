import { AuthState, RootState, UserLocation } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* Initial State */
const initialState: AuthState = {
  user: null,
};

/* Slice */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

/* Selectors */
export const userSelector = (state: RootState) => state.user;
