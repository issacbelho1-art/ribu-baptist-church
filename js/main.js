document.addEventListener("DOMContentLoaded", () => {

    // =====================
    // ✅ MENU TOGGLE
    // =====================
    const btn = document.querySelector(".menu-toggle");
    const menu = document.getElementById("menu");

    if (btn && menu) {
        btn.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    }

    // ✅ CLOSE MENU WHEN CLICK LINK
    document.querySelectorAll("#menu a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
        });
    });

    // =====================
    // ✅ SCROLL ANIMATION
    // =====================
    const elements = document.querySelectorAll(".fade-in, .welcome-section");

    function showOnScroll() {
        elements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                el.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", showOnScroll);
    window.addEventListener("load", showOnScroll);

    // =====================
    // ✅ GALLERY POPUP
    // =====================
    const images = document.querySelectorAll(".gallery img");
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");

    images.forEach(img => {
        img.addEventListener("click", () => {
            if (popup && popupImg) {
                popup.style.display = "flex";
                popupImg.src = img.src;
            }
        });
    });

    window.closeImage = function () {
        if (popup) popup.style.display = "none";
    };

    // =====================
    // ⏳ LIVE / COUNTDOWN
    // =====================
    const serviceTime = new Date("2026-04-14T09:30:00");
    const badge = document.getElementById("liveBadge");
    const countdown = document.getElementById("countdownBox");

    const isLive = false;

    function updateCountdown() {
        if (!countdown) return;

        if (isLive) {
            if (badge) badge.style.display = "block";
            countdown.innerHTML = "🔴 We are LIVE now!";
            return;
        }

        if (badge) badge.style.display = "none";

        const diff = serviceTime - new Date();

        if (diff <= 0) {
            countdown.innerHTML = "Next service coming soon";
            return;
        }

        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);

        countdown.innerHTML = `Service starts in: ${h}h ${m}m ${s}s`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

});