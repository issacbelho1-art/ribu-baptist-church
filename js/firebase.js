import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔥 YOUR CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDB2eoRYSKzwvKFbajbxkcMQX-3dtJhchI",
  authDomain: "ribu-baptist-church.firebaseapp.com",
  projectId: "ribu-baptist-church",
  storageBucket: "ribu-baptist-church.firebasestorage.app",
  messagingSenderId: "562936044968",
  appId: "1:562936044968:web:62b64153faecd49ee3d19d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };