import { db } from "./firebase.js";
import { collection, addDoc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("prayerForm");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
            const name = document.getElementById("name").value.trim();
            const request = document.getElementById("request").value.trim();

            if (!name || !request) {
                alert("Please fill all fields");
                return;
            }

            await addDoc(collection(db, "prayers"), {
                name,
                request,
                timestamp: new Date()
            });

            alert("Prayer request submitted 🙏");
            form.reset();

        } catch (error) {
            console.error(error);
            alert("Error submitting prayer");
        }
    });

});