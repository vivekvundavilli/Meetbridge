// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDyctJHFem6C2pEQ9tZ_ZNA9jgBtpoDhT8",
  authDomain: "meet-bridge-57e99.firebaseapp.com",
  projectId: "meet-bridge-57e99",
  storageBucket: "meet-bridge-57e99.firebasestorage.app",
  messagingSenderId: "10604477839",
  appId: "1:10604477839:web:fa066b2f4f5a1414fddffa",
  measurementId: "G-BNNCJ1HMVZ"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export for other files
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);






