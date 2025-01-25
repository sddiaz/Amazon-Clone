import { UserInfo } from "firebase/auth";

/* Types */
export type UserData = {
  addressBook: string[];
  authProvider: string; 
  cart: { productId: string, quantity: number }[];
  defaultAddress: string;
  email: string;
  favorites: { productId: string }[];
  firstName: string | undefined;
  lastName: string | undefined;
  uid: string;
}
export type UserLocation = {
  city: string;
  country: string;
  postcode: string;
  state: string;
  state_code: string;
};

export type Department = {
    id: number;
    name: string;
    subcategories?: string[];
};

/* State Interfaces */
export interface LocationState {
  userLocation: UserLocation | null;
  lastFetched: number | null;
};

export interface AuthState {
  authInfo: UserInfo | null;
}
export interface UserState {
  userData: UserData | null; 
}

export interface RootState {
  location: LocationState;
  auth: AuthState;
  user: UserState; 
  // other slices...
};