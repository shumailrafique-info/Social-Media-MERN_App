import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABMa9v1UtcUSJaVvoGPhe9sjQDN6Sl4GI",
  authDomain: "chat-app-af3f3.firebaseapp.com",
  projectId: "chat-app-af3f3",
  storageBucket: "chat-app-af3f3.appspot.com",
  messagingSenderId: "715728246117",
  appId: "1:715728246117:web:23461b5dee058702cb3d8c",
  measurementId: "G-CY572BBN71",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
