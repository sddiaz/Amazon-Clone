'use client'
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './config'; 
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '@/app/state/slices/auth-slice';
import { UserInfo } from 'firebase/auth';

export default function FirebaseInitializer() {

  const auth = getAuth(app); 
  const dispatch = useDispatch();

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userInfo: UserInfo = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          providerId: user.providerId
        };
        dispatch(setUser(userInfo));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();

  }, [dispatch]);

  return null;
}