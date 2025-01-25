import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNOgTIpUHL91-oeetY90a4-d86ksTW_OE",
  authDomain: "clone-15c4c.firebaseapp.com",
  projectId: "clone-15c4c",
  storageBucket: "clone-15c4c.firebasestorage.app",
  messagingSenderId: "67680890576",
  appId: "1:67680890576:web:219646b0306969be40b8d5",
  measurementId: "G-C5SDXTNCS4"
};

export const app = firebase.initializeApp(firebaseConfig);
export const firestoreDb = firebase.firestore(); 