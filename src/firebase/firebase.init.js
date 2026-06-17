// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr5iokUPY6WBQ3V1Mnfm1uE8OTrte7l5c",
  authDomain: "smart-deals-1b88a.firebaseapp.com",
  projectId: "smart-deals-1b88a",
  storageBucket: "smart-deals-1b88a.firebasestorage.app",
  messagingSenderId: "339962103378",
  appId: "1:339962103378:web:3ccbc7c11687b403e1818b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);