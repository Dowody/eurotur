const nav = document.querySelector(".top-nav");
let lastScrollY = window.scrollY; 

window.addEventListener("scroll", () => { 
    if (window.scrollY > 50) {
        if (lastScrollY < window.scrollY) {
            nav.classList.add("hidden");
        } else {
            nav.classList.remove("hidden");
        }
    } else {
        nav.classList.remove("hidden");
    }
    lastScrollY = window.scrollY;
});

const polygon = document.querySelector('.polygon');

window.addEventListener('scroll', function() {
    const rotation = window.scrollY * 0.1;
    polygon.style.transform = `rotate(${rotation}deg)`;
});

window.onscroll = function() {
    let docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollPosition = document.documentElement.scrollTop;
    let scrollPercentage = (scrollPosition / docHeight) * 100;
    document.getElementById('scroll-status-bar').style.width = scrollPercentage + '%';
};
