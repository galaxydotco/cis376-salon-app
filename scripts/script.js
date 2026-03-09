/*
    CIS 376 - 01 ; Dr. Cumbie
    Jasmine Morgan
    1/29/2026 - 3/9/2026
    Description: Scripts for Barbering and Beauty by Kayla Latrell homepage.
*/

/**
 * 1. APP STATE & CONSTANTS
 */
const SESSION_KEY = "user_session";
const MOCK_PASSWORD = "password123"; 

// track last scroll position
let lastScrollY = window.scrollY;

/**
 * 2. INITIALIZATION
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("--- System: Salon App Initializing ---");
    
    // check if someone is already logged in (session storage usage)
    checkSession();

    // attach all our event listeners + named functions
    initEventListeners();
    
    console.log("--- System: Initialization Complete ---");
});

function initEventListeners() {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const searchInput = document.getElementById("site-search");
    const menuToggle = document.getElementById('mobile-menu');

    // scroll down > shrink nav logic
    window.addEventListener("scroll", handleNavbarShrink);

    // login/signup form listeners
    loginForm.addEventListener("submit", handleLogin);
    signupForm.addEventListener("submit", handleSignup);

    // search listener
    searchInput.addEventListener("input", handleSearch);

    // listen for the enter key inside the search input
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // prevent page refresh if inside a form
            handleSearch();     // run in the existing search function
        }
    });

    // hamburger style :> toggle
    menuToggle.addEventListener('click', toggleMobileMenu);

    // Logic for opening/closing the login popup
    setupModalLogic();
}

/**
 * 3. CORE FUNCTIONS
 */
// shrink nav on scroll logic
function handleNavbarShrink() {
    const navbar = document.getElementById("navbar"); // get the nav bar element
    
    if (window.scrollY > lastScrollY) {
        // scroll down > shrink nav
        navbar.classList.add("shrink");
    } else {
        // scroll up > expand nav
        navbar.classList.remove("shrink");
    }
    // update last scroll position
    lastScrollY = window.scrollY;
}

// password check implemented in front-end logic
function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const username = form.querySelector('input[type="text"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (password === MOCK_PASSWORD) {
        // password result clearly logged in console (success feedback)
        console.log(`%c [AUTH SUCCESS] User: ${username}`, "color: #00ff00; font-weight: bold;");
        
        // session storage usage: save user data so they stay logged in
        const userData = { username: username, loginTime: new Date().toLocaleTimeString() };
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(userData));

        // DOM mutation updates ui based on state/data
        updateUIForLogin(userData);
        closeModal();
    } else {
        // password result clearly logged in console (failure feedback)
        console.warn("[AUTH FAILED] Incorrect password attempt.");
        alert("Incorrect password! Try: password123");
    }
}

// ability to clear/reset session data
function handleLogout() {
    console.log("%c [SESSION] Clearing session data...", "color: #ff9900;");
    sessionStorage.removeItem(SESSION_KEY);
    window.location.reload(); // reset the ui to original state
}

function checkSession() {
    const savedUser = sessionStorage.getItem(SESSION_KEY);
    if (savedUser) {
        const user = JSON.parse(savedUser);
        console.log(`[SESSION] Active session found for: ${user.username}`);
        updateUIForLogin(user);
    }
}

function updateUIForLogin(user) {
    // DOM mutation: changes "book now" into "log out" and shows username
    const profileLink = document.querySelector('.nav-links .trigger-login:first-child');
    const bookBtn = document.querySelector('.cta.trigger-login');

    if (profileLink) profileLink.innerText = `Hi, ${user.username}`;
    
    if (bookBtn) {
        bookBtn.innerText = "Log Out";
        bookBtn.classList.add("logout-active");
        bookBtn.onclick = (e) => {
            e.preventDefault();
            handleLogout();
        };
    }
}

// search (in nav bar) logic 
function handleSearch() {
    const query = document.getElementById("site-search").value.toLowerCase();
    const serviceCards = document.querySelectorAll(".service-card");
    const categories = document.querySelectorAll(".category-group");
    const noResultsMsg = document.getElementById("no-results");
    
    let visibleCount = 0; // track how many matches found

    serviceCards.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (text.includes(query)) {
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
    noResultsMsg.style.display = (visibleCount === 0) ? "block" : "none";
}

/**
 * 4. UI HELPERS
 */
function setupModalLogic() {
    const modal = document.getElementById("login-modal");
    const closeBtn = document.querySelector(".close-btn");
    const triggers = document.querySelectorAll(".trigger-login");

    // open Modal Logic
    triggers.forEach(t => {
        t.addEventListener("click", (e) => {
            if (!t.classList.contains("logout-active")) {
                e.preventDefault();
                modal.style.display = "flex";
            }
        });
    });

    // close Modal Logic
    closeBtn.onclick = closeModal;
    window.onclick = (e) => { if (e.target === modal) closeModal(); };

    // toggle Logic between Signup and Login
    document.getElementById("to-signup").onclick = (e) => {
        e.preventDefault();
        document.getElementById("login-section").style.display = "none";
        document.getElementById("signup-section").style.display = "block";
    };
    document.getElementById("to-login").onclick = (e) => {
        e.preventDefault();
        document.getElementById("signup-section").style.display = "none";
        document.getElementById("login-section").style.display = "block";
    };
}

function closeModal() {
    document.getElementById("login-modal").style.display = "none";
}

function toggleMobileMenu() {
    // show links when 'active' class is added via JS 
    document.querySelector('.nav-links').classList.toggle('active');
    // optional: animate hamburger to an 'X'
    document.getElementById('mobile-menu').classList.toggle('is-active');
    console.log("[UI] Mobile menu toggled.");
}

function handleSignup(e) {
    e.preventDefault();
    console.log("State Change: User signed up.");
    alert("Account created! Now login with password123");
    document.getElementById("to-login").click(); // toggle back to login
}

// taking a java class GREATLY helped my understanding in js