import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } 
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// LOGIN BUTTON
document.getElementById("loginBtn").addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Email:", email);
    console.log("Password:", password);

    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "admin.html";
    } catch (error) {
        document.getElementById("errorMsg").innerText = error.message;
        console.log(error.code);
        console.log(error.message);
    }
});