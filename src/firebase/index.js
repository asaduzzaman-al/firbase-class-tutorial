// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  GoogleAuthProvider,
  getAuth,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClrpO9VTGFVyMGRz1Xh6j7wvLiq3zeDso",
  authDomain: "mern-apps-399bc.firebaseapp.com",
  projectId: "mern-apps-399bc",
  storageBucket: "mern-apps-399bc.appspot.com",
  messagingSenderId: "30427236385",
  appId: "1:30427236385:web:9be1fae1e84fc278dffb60",
};
// initialize firebase
export const firebaseApp = initializeApp(firebaseConfig);

// initialize storage
export const storage = getStorage(firebaseApp);

// init fire auth
export const auth = getAuth(firebaseApp);
// google auth provider
export const googleProvider = new GoogleAuthProvider();
// google auth provider
export const facebookProvider = new FacebookAuthProvider();
