import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "blogwave-e3447.firebaseapp.com",
  projectId: "blogwave-e3447",
  storageBucket: "blogwave-e3447.appspot.com",
  messagingSenderId: "816730880999",
  appId: "1:816730880999:web:90b182011f0c5bc8fd5b42"
};

export const app = initializeApp(firebaseConfig);

