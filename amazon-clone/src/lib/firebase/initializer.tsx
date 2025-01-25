"use client";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, firestoreDb } from "./config";
import { useDispatch } from "react-redux";
import { setAuthInfo, clearAuthInfo } from "@/app/state/slices/auth-slice";
import { UserInfo } from "firebase/auth";
import { UserData } from "@/app/types";
import { setUserData } from "@/app/state/slices/user-slice";
export default function FirebaseInitializer() {

  const auth = getAuth(app);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Auth info
        const userInfo: UserInfo = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          providerId: user.providerId,
        };

        const userRef = firestoreDb.collection("users").doc(userInfo.uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          const userData: UserData = {
            addressBook: [],
            cart: [],
            defaultAddress: "",
            email: user.email as string,
            favorites: [],
            firstName: user.displayName?.split(" ")[0],
            lastName: user.displayName?.split(" ")[1],
            uid: user.uid,
            authProvider: user.providerData[0].providerId,
          };
          await userRef.set(userData);
          // Dispatch both auth info and user data
          dispatch(setAuthInfo(userInfo));
          dispatch(setUserData(userData)); 
        } 
        else {
          dispatch(setAuthInfo(userInfo));
          dispatch(setUserData(userDoc.data()));
        }
        
      } else {
        dispatch(clearAuthInfo());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}
