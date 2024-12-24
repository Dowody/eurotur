const nav = document.querySelector(".top-nav");
let lastScrollY = window.scrollY; 

window.addEventListener("scroll", () => { 
    if (lastScrollY < window.scrollY) {
        nav.classList.add("hidden");
    } else {
        nav.classList.remove("hidden");
    }
    lastScrollY = window.scrollY;
});