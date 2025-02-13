// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC0_wxG2WdShnGmQFvkdlzZ1eBDZCiN6s",
  authDomain: "travel-1a073.firebaseapp.com",
  projectId: "travel-1a073",
  storageBucket: "travel-1a073.firebasestorage.app",
  messagingSenderId: "859646908361",
  appId: "1:859646908361:web:e0bd334a03225486c03a18",
  measurementId: "G-R9LFECZQYD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
