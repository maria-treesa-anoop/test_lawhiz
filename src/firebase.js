// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from 'firebase/firestore';
import {  GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdFBtHMWEepU-bjOYp1hrRSzRR2HuLUns",
  authDomain: "law-whiz.firebaseapp.com",
  projectId: "law-whiz",
  storageBucket: "law-whiz.appspot.com",
  messagingSenderId: "464417322220",
  appId: "1:464417322220:web:774154c6ad65d6e1d221c9",
  measurementId: "G-WBSEB1DNDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const googleAuthProvider = new GoogleAuthProvider();
const db = getFirestore(app);
export { db, analytics };