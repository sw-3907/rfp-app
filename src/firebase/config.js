import app from "firebase/app";
import "firebase/firestore";

// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGn6mX0PExeoGWEEvTkgAHoSVx_7SczLY",
  authDomain: "rfp-listing.firebaseapp.com",
  projectId: "rfp-listing",
  storageBucket: "rfp-listing.appspot.com",
  messagingSenderId: "299126468287",
  appId: "1:299126468287:web:150557ac1ca383cf19600a",
  measurementId: "G-H6PWLW4N08"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export {firebaseConfig, firestore, app }