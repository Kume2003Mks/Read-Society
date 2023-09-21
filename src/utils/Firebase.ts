// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEHkLocAjyvmo2GUguvWROZb2mgXNhWlA",
  authDomain: "read-society.firebaseapp.com",
  projectId: "read-society",
  storageBucket: "read-society.appspot.com",
  messagingSenderId: "474725644988",
  appId: "1:474725644988:web:38aca9e88ec39776ceeeb9",
  measurementId: "G-ZP7GHE3FY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/*
const analytics = getAnalytics(app);
*/
export const Auth = getAuth(app); 
export const database = getFirestore(app);

export default app;
