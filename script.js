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

// POLYGON
const polygons = document.querySelectorAll('.polygon');

window.addEventListener('scroll', function() {
    const rotation = window.scrollY * 0.1;
    polygons.forEach(polygon => {
        polygon.style.transform = `rotate(${rotation}deg)`;
    });
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
            card.classList.add('reveal-card');
        } else {
            card.classList.remove('reveal-card');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();



function isInViewport2(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

function revealOnScroll2() {
    const revealItems = document.querySelectorAll('[class*="reveal-item"]'); // Select all elements with 'reveal-item' in their class name
    revealItems.forEach(item => {
        if (isInViewport2(item) && !item.classList.contains('reveal')) {  // Add 'reveal' only if not already revealed
            item.classList.add('reveal');
        }
    });
}

window.addEventListener('scroll', revealOnScroll2);
window.addEventListener('load', revealOnScroll2);
window.addEventListener('load', revealOnScroll2);



document.addEventListener('DOMContentLoaded', function() {
    const countUpElements = document.querySelectorAll('.countup');

    // Function to animate the number count-up with a plus sign
    function countUp(element) {
        const target = +element.getAttribute('data-target'); // Get target number from data attribute
        let current = 0; // Start count from 0
        const increment = target / 100; // Adjust increment based on the target (faster for larger numbers)

        function animateCount() {
            if (current < target) {
                current += increment;
                element.textContent = `+${Math.floor(current)}`; // Add "+" sign before the number
                requestAnimationFrame(animateCount); // Call the next frame for the animation
            } else {
                element.textContent = `+${target}`; // Ensure it reaches the final value with "+" sign
            }
        }

        animateCount(); // Start the animation
    }

    // Set up the intersection observer to detect when the number is in view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                countUp(element); // Trigger the count-up animation when the element comes into view
                observer.unobserve(element); // Stop observing the element once the animation starts
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is in view
    });

    // Observe each count-up element
    countUpElements.forEach(element => {
        observer.observe(element);
    });
});



// OFFERS SLIDESHOW
let currentSlide = 0;
let direction = 1;
const slides = document.querySelectorAll('.slide');

function changeSlide() {
    const totalSlides = slides.length;
    const exitingSlide = slides[currentSlide];
    currentSlide += direction;

    if (currentSlide === totalSlides) {
        currentSlide = totalSlides - 2;
        direction = -1;
    } else if (currentSlide < 0) {
        currentSlide = 1;
        direction = 1;
    }

    const enteringSlide = slides[currentSlide];

    exitingSlide.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.5s ease';
    exitingSlide.style.transform = direction > 0 ? 'translateX(-100%)' : 'translateX(100%)';
    exitingSlide.style.opacity = '0';

    enteringSlide.style.transition = 'none';
    enteringSlide.style.transform = direction > 0 ? 'translateX(100%)' : 'translateX(-100%)';
    enteringSlide.style.opacity = '0';

    requestAnimationFrame(() => {
        enteringSlide.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.5s ease';
        enteringSlide.style.transform = 'translateX(0)';
        enteringSlide.style.opacity = '1';
    });

    setTimeout(() => {
        exitingSlide.style.transition = 'none';
    }, 800);
}

slides.forEach((slide, index) => {
    slide.style.position = 'absolute';
    slide.style.top = '0';
    slide.style.left = '0';
    slide.style.width = '100%';
    slide.style.height = '100%';
    slide.style.transform = index === 0 ? 'translateX(0)' : 'translateX(100%)';
    slide.style.opacity = index === 0 ? '1' : '0';
});

setInterval(changeSlide, 7000);