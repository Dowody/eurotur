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


const sliders = document.querySelectorAll('.slider');
const intervalTime = 3000;

sliders.forEach((slider, index) => {
    const images = slider.querySelectorAll('img');
    const dots = slider.closest('.white-card').querySelectorAll('.dot');
    let currentIndex = 0;

    function showImage(index) {
        slider.style.transform = `translateX(${-index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            currentIndex = parseInt(e.target.dataset.index);
            showImage(currentIndex);
        });
    });

    showImage(currentIndex);
    setInterval(showNextImage, intervalTime);
});

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    return rect.top <= viewportHeight * 0.75 && rect.bottom >= 0;
}

function revealOnScroll() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('reveal-item');
        } else {
            card.classList.remove('reveal-item');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();