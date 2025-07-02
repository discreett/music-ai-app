// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaLzK-YKel4ToRTPN-9JJimxcCNnqZHBM",
  authDomain: "tunetutor-89eb4.firebaseapp.com",
  projectId: "tunetutor-89eb4",
  storageBucket: "tunetutor-89eb4.firebasestorage.app",
  messagingSenderId: "477419951841",
  appId: "1:477419951841:web:83451adcd0bfc20c3b49a0",
  measurementId: "G-9WE79CELY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);