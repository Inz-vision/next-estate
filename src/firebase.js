// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "next-estate-5f60a.firebaseapp.com",
  projectId: "next-estate-5f60a",
  storageBucket: "next-estate-5f60a.firebasestorage.app",
  messagingSenderId: "27984604897",
  appId: "1:27984604897:web:3c2621966822d5c06a11a0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);