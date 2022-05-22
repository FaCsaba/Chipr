import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy2yPvUtFH3l0FvXo_RvnF5-eHdWKtrO4",
  authDomain: "chirpr-758b8.firebaseapp.com",
  databaseURL: "https://chirpr-758b8-default-rtdb.firebaseio.com",
  projectId: "chirpr-758b8",
  storageBucket: "chirpr-758b8.appspot.com",
  messagingSenderId: "362781861036",
  appId: "1:362781861036:web:421ffabe8e23bdcfb0ab09"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const bucket = getStorage(app);