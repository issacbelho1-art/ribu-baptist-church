import { db } from "./firebase.js";
import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const container = document.getElementById("requestsContainer");

// ========================
// CREATE CARD
// ========================
function createCard(title, data, collectionName, id, dateField = "timestamp") {

    const card = document.createElement("div");
    card.className = "request-card";

    const date =
        data[dateField]?.seconds
            ? new Date(data[dateField].seconds * 1000).toLocaleString()
            : "N/A";

    let content = "";

    Object.keys(data).forEach((key) => {
        if (key !== dateField) {
            content += `<p><b>${key}:</b> ${data[key] || "N/A"}</p>`;
        }
    });

    card.innerHTML = `
        <h3>${title}</h3>
        ${content}
        <div class="meta">Submitted: ${date}</div>

        <button onclick="deleteItem('${collectionName}', '${id}')">
            Delete
        </button>
    `;

    return card;
}

// ========================
// LOAD ALL DATA
// ========================
async function loadAll() {
    if (!container) return;

    container.innerHTML = "<p>Loading data...</p>";

    try {
        container.innerHTML = "";

        // JOIN REQUESTS
        const joinSnap = await getDocs(collection(db, "joinRequests"));
        joinSnap.forEach((docItem) => {
            container.appendChild(
                createCard("Join Request", docItem.data(), "joinRequests", docItem.id)
            );
        });

        // PRAYERS
        const prayerSnap = await getDocs(collection(db, "prayers"));
        prayerSnap.forEach((docItem) => {
            container.appendChild(
                createCard("Prayer Request", docItem.data(), "prayers", docItem.id)
            );
        });

        // DONATIONS
        const donationSnap = await getDocs(collection(db, "donations"));
        donationSnap.forEach((docItem) => {
            container.appendChild(
                createCard("Donation", docItem.data(), "donations", docItem.id)
            );
        });

        if (
            joinSnap.empty &&
            prayerSnap.empty &&
            donationSnap.empty
        ) {
            container.innerHTML = "<p>No data available.</p>";
        }

    } catch (error) {
        console.error("Load error:", error);
        container.innerHTML = "Error loading data";
    }
}

// ========================
// DELETE FUNCTION (ALL COLLECTIONS)
// ========================
window.deleteItem = async function (collectionName, id) {

    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
        await deleteDoc(doc(db, collectionName, id));
        loadAll(); // refresh dashboard
    } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting item");
    }
};

// ========================
// AUTH CHECK
// ========================
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (!user) {
        container.innerHTML = "Please login first.";
        return;
    }

    loadAll();
});

window.exportPDF = async function (collectionName) {

    const { jsPDF } = window.jspdf;
    const docPDF = new jsPDF();

    try {
        const snapshot = await getDocs(collection(db, collectionName));

        if (snapshot.empty) {
            alert("No data to export");
            return;
        }

        // =========================
        // LOAD LOGO FROM FILE
        // =========================
        const img = new Image();
        img.src = "images/logo.jpeg";

        img.onload = () => {

            // ADD LOGO
            docPDF.addImage(img, "JPEG", 14, 10, 20, 20);

            // HEADER
            docPDF.setFontSize(16);
            docPDF.text("Ribu Baptist Church", 40, 15);

            docPDF.setFontSize(12);
            docPDF.text("Official Records", 40, 22);

            docPDF.setFontSize(10);
            docPDF.text("Date: " + new Date().toLocaleDateString(), 40, 28);

            // TITLE
            docPDF.setFontSize(12);
            docPDF.text(`${collectionName.toUpperCase()} REPORT`, 14, 45);

            // DATA
            const rows = [];

            snapshot.forEach((docItem) => {
                const data = docItem.data();

                rows.push([
                    data.name || "-",
                    data.email || "-",
                    data.phone || "-",
                    data.ministry || "-",
                    data.message || "-"
                ]);
            });

            docPDF.autoTable({
                startY: 50,
                head: [["Name", "Email", "Phone", "Ministry", "Message"]],
                body: rows
            });

            // SAVE
            docPDF.save(`${collectionName}.pdf`);
        };

    } catch (error) {
        console.error(error);
        alert("Error exporting PDF");
    }
};