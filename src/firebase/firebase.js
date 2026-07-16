// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDElf21FC18KTI2Bn-FgBkD-WE2a9c_91Y",
  authDomain: "kottra-ecd82.firebaseapp.com",
  projectId: "kottra-ecd82",
  storageBucket: "kottra-ecd82.firebasestorage.app",
  messagingSenderId: "852967609607",
  appId: "1:852967609607:web:1658a9445aa4973f1161a2",
  measurementId: "G-QK3ZZBR4FX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);