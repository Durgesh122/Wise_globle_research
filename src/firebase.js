// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, forceWebSockets, goOffline } from 'firebase/database';
import { getStorage } from 'firebase/storage'; // Added for Storage
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB4VTLgTwDAKqYKzx1gfqqhlRXCCEqD0eU",
  authDomain: "wiseglobalresearch-services.firebaseapp.com",
  databaseURL: "https://wiseglobalresearch-services-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "wiseglobalresearch-services",
  // Use the actual bucket name (not the download domain). Typically <projectId>.appspot.com
  storageBucket: "wiseglobalresearch-services.appspot.com",
  messagingSenderId: "790031846254",
  appId: "1:790031846254:web:b72a5aaa0352ba32330f7f",
  measurementId: "G-JVR9PHCWL8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// Prefer WebSockets to avoid long-polling transport that relies on deprecated unload events
try {
  if (typeof window !== 'undefined') {
    forceWebSockets();
  }
} catch (_) {
  // no-op: if not supported, SDK will choose the best available transport
}

export const db = getDatabase(app);

// Gracefully close RTDB connections on pagehide (recommended over unload)
if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', () => {
    try {
      goOffline(db);
    } catch (_) {
      // ignore
    }
  });
}
export const storage = getStorage(app); // Added storage export