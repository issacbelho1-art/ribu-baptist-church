import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDB2eoRYSKzwvKFbajbxkcMQX-3dtJhchI",
  authDomain: "ribu-baptist-church.firebaseapp.com",
  projectId: "ribu-baptist-church",
  storageBucket: "ribu-baptist-church.firebasestorage.app",
  messagingSenderId: "562936044968",
  appId: "1:562936044968:web:62b64153faecd49ee3d19d"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Admin auth running");

// 🔐 PROTECT ADMIN PAGE
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "admin-login.html";
    } else {
        console.log("Admin logged in");
    }
});

// 🚪 LOGOUT (SAFE VERSION)
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            await signOut(auth);
            window.location.href = "admin-login.html";
        } catch (error) {
            console.log(error.message);
        }
    });
}