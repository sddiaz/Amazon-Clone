/* Types */
export type UserLocation = {
  city: string;
  country: string;
  postcode: string;
  state: string;
  state_code: string;
};

/* State Interfaces */
export interface LocationState {
  userLocation: UserLocation | null;
  lastFetched: number | null;
}

export interface RootState {
  location: LocationState;
  // other slices...
}