/* Types */
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

export interface RootState {
  location: LocationState;
  // other slices...
};