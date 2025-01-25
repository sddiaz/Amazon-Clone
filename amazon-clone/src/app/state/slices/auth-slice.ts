import { AuthState, RootState } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";

/* Initial State */
const initialState: AuthState = {
  authInfo: null,
};

/* Slice */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthInfo: (state, action) => {
      state.authInfo = action.payload;
    },
    clearAuthInfo: (state) => {
      state.authInfo = null;
    },
  },
});

export const { setAuthInfo, clearAuthInfo } = authSlice.actions;
export default authSlice.reducer;

/* Selectors */
export const authInfoSelector = (state: RootState) => state?.auth?.authInfo;
