// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLj6y9kyaLQw76AMUywwIJV8UTdpFGk3o",
  authDomain: "disc-golf-tracker-5a8a9.firebaseapp.com",
  projectId: "disc-golf-tracker-5a8a9",
  storageBucket: "disc-golf-tracker-5a8a9.appspot.com",
  messagingSenderId: "818880194093",
  appId: "1:818880194093:web:fa2adfe5c22145c96abaa4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);