import { UserInfo } from "firebase/auth";

/* Types */
export type UserData = {
  addressBook: string[];
  authProvider: string;
  cart: { productId: string; quantity: number }[];
  defaultAddress: string;
  email: string;
  favorites: { productId: string }[];
  firstName: string | undefined;
  lastName: string | undefined;
  uid: string;
};

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
};

/* Store Types */
export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string; // ISO date string
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
};

export type ProductResponse = {
  limit: number;
  products: Product[];
  skip: number; 
  total: number;
}

/* State Interfaces */
export interface LocationState {
  userLocation: UserLocation | null;
  lastFetched: number | null;
}

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
}
