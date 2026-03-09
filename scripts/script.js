/*
    CIS 376 - 01 ; Dr. Cumbie
    Jasmine Morgan
    1/29/2026 - 3/9/2026
    Description: Scripts for Barbering and Beauty by Kayla Latrell homepage.
*/

// get the nav bar element
const navbar = document.getElementById("navbar");

// track last scroll position
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {

    // scroll down > shrink nav
    if (window.scrollY > lastScrollY) {
        navbar.classList.add("shrink");
    }
    // scroll up > expand nav
    else {
        navbar.classList.remove("shrink");
    }

    // update last scroll position
    lastScrollY = window.scrollY;
});

// search (in nav bar) logic 
function handleSearch() {
    const query = document.getElementById("site-search").value.toLowerCase();
    const serviceCards = document.querySelectorAll(".service-card");
    const categories = document.querySelectorAll(".category-group");

    serviceCards.forEach(card => {
        // get text summary
        const serviceTitle = card.querySelector("strong").innerText.toLowerCase();
        const serviceDescription = card.querySelector(".service-details").innerText.toLowerCase();

        if (serviceTitle.includes(query) || serviceDescription.includes(query)) {
            card.style.display = "block"; // show match
        } else {
            card.style.display = "none";  // hide non-match
        }
    });
}

// real-time search listener
document.getElementById("site-search").addEventListener("input", handleSearch);

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("login-modal");
    const closeBtn = document.querySelector(".close-btn");
    const loginTriggers = document.querySelectorAll(".trigger-login");
    
    // Toggle Elements
    const loginSection = document.getElementById("login-section");
    const signupSection = document.getElementById("signup-section");
    const toSignupLink = document.getElementById("to-signup");
    const toLoginLink = document.getElementById("to-login");

    // 1. Open Modal Logic
    loginTriggers.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            modal.style.display = "flex";
        });
    });

    // 2. Close Modal Logic
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // 3. Toggle Logic (Now inside the DOMContentLoaded block!)
    toSignupLink.addEventListener("click", (e) => {
        e.preventDefault();
        loginSection.style.display = "none";
        signupSection.style.display = "block";
    });

    toLoginLink.addEventListener("click", (e) => {
        e.preventDefault();
        signupSection.style.display = "none";
        loginSection.style.display = "block";
    });
});
