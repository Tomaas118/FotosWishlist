import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey : "AIzaSyBg-sfg3pwyblvq2s7_wPyCkvhFjxNZoHU",
  authDomain : "Medicheck.com",
  projectId : "medicheck-cp",
  messagingSenderId : "970592888918",
  appId : "1:970592888918:android:a9cf5b044e9e533627b3f7"
};

const app = initializeApp ( firebaseConfig ) ;
export const auth = getAuth ( app ) ;