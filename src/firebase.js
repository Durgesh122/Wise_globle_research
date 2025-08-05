// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage'; // Added for Storage
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB4VTLgTwDAKqYKzx1gfqqhlRXCCEqD0eU",
  authDomain: "wiseglobalresearch-services.firebaseapp.com",
  databaseURL: "https://wiseglobalresearch-services-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "wiseglobalresearch-services",
  storageBucket: "wiseglobalresearch-services.firebasestorage.app",
  messagingSenderId: "790031846254",
  appId: "1:790031846254:web:b72a5aaa0352ba32330f7f",
  measurementId: "G-JVR9PHCWL8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app); // Added storage export