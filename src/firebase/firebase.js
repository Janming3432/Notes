// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6Y3Zt2r2DrzLM_gDF66d5hsHF1ZcG3Ic",
  authDomain: "notes-apppp.firebaseapp.com",
  projectId: "notes-apppp",
  storageBucket: "notes-apppp.appspot.com",
  messagingSenderId: "149144790074",
  appId: "1:149144790074:web:d95c8d9071175e615d4103"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 