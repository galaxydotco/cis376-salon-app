/*
    CIS 376 - 01 ; Dr. Cumbie
    Jasmine Morgan
    1/29/2026 - (UPDATE BEFORE SUBMISSION)
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