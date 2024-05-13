import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatapp-7e7cc.firebaseapp.com",
  projectId: "chatapp-7e7cc",
  storageBucket: "chatapp-7e7cc.appspot.com",
  messagingSenderId: "794316907855",
  appId: "1:794316907855:web:1d595082c98ca5b63fd13a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()