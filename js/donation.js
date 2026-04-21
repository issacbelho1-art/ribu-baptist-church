// OPEN POPUP (must be global)
window.showDonorPopup = function () {
    console.log("Donate button clicked");
    const popup = document.getElementById("donorPopup");
    if (popup) popup.style.display = "flex";
};
import { db } from "./firebase.js";
import { collection, addDoc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// OPEN POPUP
window.showDonorPopup = function () {
    document.getElementById("donorPopup").style.display = "flex";
};

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("donationForm");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
            const name = document.getElementById("donationName").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !phone) {
                alert("Please enter name and phone");
                return;
            }

            if (!/^[0-9]{10}$/.test(phone)) {
                alert("Enter valid 10-digit phone");
                return;
            }

            await addDoc(collection(db, "donations"), {
                name,
                phone,
                message,
                timestamp: new Date()
            });

            alert("Thank you for your support 🙏");

            form.reset();
            document.getElementById("donorPopup").style.display = "none";

            // 📱 MOBILE CHECK
            const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

            if (isMobile) {
                window.location.href = "upi://pay?pa=issacbelho1@okaxis&pn=Ribu%20Baptist%20Church&cu=INR";
            } else {
                alert("Please use your mobile or scan QR code to pay.");
            }

        } catch (error) {
            console.error(error);
            alert("Error submitting donation");
        }
    });

});