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
    const noResultsMsg = document.getElementById("no-results");

    let visibleCount = 0; // track how many matches found

    serviceCards.forEach(card => {
        const serviceTitle = card.querySelector("strong").innerText.toLowerCase();
        const serviceDescription = card.querySelector(".service-details").innerText.toLowerCase();

        if (serviceTitle.includes(query) || serviceDescription.includes(query)) {
            card.style.display = "block";
            visibleCount++; // found match
        } else {
            card.style.display = "none";
        }
    });

    // hide/show category headings
    categories.forEach(category => {
        const visibleInCat = category.querySelectorAll('.service-card[style="display: block;"], .service-card:not([style])');
        category.style.display = visibleInCat.length > 0 ? "block" : "none";
    });

    // toggle the "no results" message
    if (visibleCount === 0) {
        noResultsMsg.style.display = "block";
    } else {
        noResultsMsg.style.display = "none";
    }
}

// search listener
document.getElementById("site-search").addEventListener("input", handleSearch);

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("login-modal");
    const closeBtn = document.querySelector(".close-btn");
    const loginTriggers = document.querySelectorAll(".trigger-login");

    const searchInput = document.getElementById("site-search");

    // listen for the enter key inside the search input
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // prevent page refresh if inside a form
            handleSearch();         // run in the existing search function
        }
    });

    // toggle Elements
    const loginSection = document.getElementById("login-section");
    const signupSection = document.getElementById("signup-section");
    const toSignupLink = document.getElementById("to-signup");
    const toLoginLink = document.getElementById("to-login");

    // open Modal Logic
    loginTriggers.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            modal.style.display = "flex";
        });
    });

    // close Modal Logic
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // toggle Logic
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

    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Optional: Animate hamburger to an 'X'
        menuToggle.classList.toggle('is-active');
    });
});
