// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCi9Yi2T2H1GPKjnFr6oX_ZpC5JFEfo7XI",
  authDomain: "meetbridge-bb72b.firebaseapp.com",
  projectId: "meetbridge-bb72b",
  storageBucket: "meetbridge-bb72b.firebasestorage.app",
  messagingSenderId: "509241057936",
  appId: "1:509241057936:web:3d604b99459e2c19c22e15",
  measurementId: "G-5XVPLCL7HY"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export for other files
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);






