import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyA7cv9zPQ_2Q0ITkbnN44crGsDjYIo8Z4E",
  authDomain: "bikermarket-97b68.firebaseapp.com",
  projectId: "bikermarket-97b68",
  storageBucket: "bikermarket-97b68.appspot.com",
  messagingSenderId: "434871614153",
  appId: "1:434871614153:web:f3c05ec396c6b9d828ab18",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const firebaseAuth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
