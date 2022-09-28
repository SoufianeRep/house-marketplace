// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQsJsaesEF5QqD5ebR5w2Df9WADvb2gmc",
  authDomain: "house-marketplace-60a55.firebaseapp.com",
  projectId: "house-marketplace-60a55",
  storageBucket: "house-marketplace-60a55.appspot.com",
  messagingSenderId: "62343742152",
  appId: "1:62343742152:web:02073135c7ccdcf2321bfd"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
