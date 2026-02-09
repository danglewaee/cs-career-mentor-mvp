import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyDi3wbrtu5mLrkPL-tsnaY-_7Pwysvtoq0",
  authDomain: "course-advisor-20960.firebaseapp.com",
  projectId: "course-advisor-20960",
  storageBucket: "course-advisor-20960.firebasestorage.app",
  messagingSenderId: "500002601601",
  appId: "1:500002601601:web:41b2bb1232b5b6460dab80",
  measurementId: "G-X9TV6LT47Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleprovider=new GoogleAuthProvider()
const githubprovider=new GithubAuthProvider()
export { auth, db,googleprovider,githubprovider };