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