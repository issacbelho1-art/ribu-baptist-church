import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.js";

const auth = getAuth();

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  console.log("Logged UID:", user.uid);

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    console.log("User doc not found in Firestore");
    document.body.innerHTML = "Access Denied";
    return;
  }

  const role = userSnap.data().role;
  console.log("Role:", role);

  if (role !== "admin") {
    document.body.innerHTML = "Access Denied";
    return;
  }

  // ✅ ADMIN ALLOWED
  loadRequests();
});