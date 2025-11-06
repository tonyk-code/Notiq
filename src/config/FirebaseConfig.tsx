import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import type { configType } from "../utils/Types";

const firebaseConfig: configType = {
  apiKey: "AIzaSyCao8qPlypMm4xbIwIUqUJ4DPWSMccShus",
  authDomain: "notiq-d2aa5.firebaseapp.com",
  projectId: "notiq-d2aa5",
  storageBucket: "notiq-d2aa5.firebasestorage.app",
  messagingSenderId: "687616411185",
  appId: "1:687616411185:web:ef45bd20f129a6f9193710",
  measurementId: "G-PB6QLEM6WZ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
