
const preloader = document.getElementById('preloader');

setTimeout(() => {
    preloader.classList.add('fadeOut');

    setTimeout(() => {
        preloader.style.display = 'none';
        document.querySelectorAll('.preload-excluded').forEach(image => {
            image.style.visibility = 'visible';
        });
    }, 1000); 
}, 1500); 


// window.addEventListener('load', () => {
//     const preloader = document.getElementById('preloader');
//     preloader.classList.add('fadeOut');
//     setTimeout(() => {
//         preloader.style.display = 'none';
//         let preloadImages = document.querySelectorAll('.preload-excluded');
//         preloadImages.forEach(function(image) {
//             image.style.visibility = 'visible';
//         });
//     }, 1000);
// });


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


// OFFERS
document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let autoSlideDirectionOffers = 1; // Direction for the offers slider
    let autoSlideIntervalOffers;

    function changeSlideOffers(direction) {
        // Prevent change if we're already at the start or the end
        if (direction === -1 && currentSlide === 0) return; // If we're at the first slide and trying to go left
        if (direction === 1 && currentSlide === totalSlides - 1) return; // If we're at the last slide and trying to go right

        const newSlideIndex = (currentSlide + direction + totalSlides) % totalSlides;
        if (newSlideIndex === currentSlide) return;

        const exitingSlide = slides[currentSlide];
        currentSlide = newSlideIndex;
        const enteringSlide = slides[currentSlide];

        exitingSlide.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.5s ease';
        exitingSlide.style.transform = direction > 0 ? 'translateX(-105%)' : 'translateX(105%)';
        exitingSlide.style.opacity = '1';

        enteringSlide.style.transition = 'none';
        enteringSlide.style.transform = direction > 0 ? 'translateX(105%)' : 'translateX(-105%)';
        enteringSlide.style.opacity = '1';

        requestAnimationFrame(() => {
            enteringSlide.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.5s ease';
            enteringSlide.style.transform = 'translateX(0)';
            enteringSlide.style.opacity = '1';
        });
    }

    slides.forEach((slide, index) => {
        slide.style.position = 'absolute';
        slide.style.top = '0';
        slide.style.left = '0';
        slide.style.width = '100%';
        slide.style.height = '100%';
        slide.style.transform = index === 0 ? 'translateX(0)' : 'translateX(105%)';
        slide.style.opacity = index === 0 ? '1' : '1';
    });

    function startAutoSlideOffers() {
        autoSlideIntervalOffers = setInterval(() => {
            changeSlideOffers(autoSlideDirectionOffers);

            if (currentSlide === 0 || currentSlide === totalSlides - 1) {
                autoSlideDirectionOffers = -autoSlideDirectionOffers; // Reverse direction at ends
            }
        }, 6000);
    }

    function resetAutoSlideOffers() {
        clearInterval(autoSlideIntervalOffers);
        startAutoSlideOffers();
    }

    startAutoSlideOffers();

    let startXOffers = 0;
    let currentXOffers = 0;
    let isDraggingOffers = false;
    const sliderContainerOffers = document.querySelector('.slideshow');

    sliderContainerOffers.addEventListener('touchstart', (e) => {
        startXOffers = e.touches[0].clientX;
        isDraggingOffers = true;
    });

    sliderContainerOffers.addEventListener('touchmove', (e) => {
        if (!isDraggingOffers) return;
        currentXOffers = e.touches[0].clientX;
        const deltaX = Math.abs(currentXOffers - startXOffers);
        if (deltaX > 10) e.preventDefault();
    }, { passive: false });

    sliderContainerOffers.addEventListener('touchend', () => {
        if (!isDraggingOffers) return;
        const deltaX = currentXOffers - startXOffers;
        if (deltaX > 50) {
            changeSlideOffers(-1);
        } else if (deltaX < -50) {
            changeSlideOffers(1);
        }
        resetAutoSlideOffers();
        startXOffers = 0;
        currentXOffers = 0;
        isDraggingOffers = false;
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeSlideOffers(-1);
            resetAutoSlideOffers();
        } else if (e.key === 'ArrowRight') {
            changeSlideOffers(1);
            resetAutoSlideOffers();
        }
    });
});

// REVIEWS
document.addEventListener('DOMContentLoaded', () => {
    let currentSlide2 = 0;
    const slides2 = document.querySelectorAll('.slide2');
    const totalSlides2 = slides2.length;
    let autoSlideDirectionReviews = 1;
    let autoSlideIntervalReviews;

    function updateSlidePositions() {
        slides2.forEach((slide, index) => {
            const offset = (index - currentSlide2 + totalSlides2) % totalSlides2;
    
            if (offset === 0) {
                // Current slide
                slide.style.transform = 'translateX(0)';
                slide.style.zIndex = 2;
                slide.style.opacity = '1';
                slide.style.display = 'block';
            } else if (offset === 1) {
                // Next slide
                slide.style.transform = 'translateX(105%)';
                slide.style.zIndex = 1;
                slide.style.opacity = '1';
                slide.style.display = 'block';
            } else if (offset === totalSlides2 - 1) {
                // Previous slide
                slide.style.transform = 'translateX(-105%)';
                slide.style.zIndex = 1;
                slide.style.opacity = '1';
                slide.style.display = 'block';
            } else {
                // Other slides (completely hidden)
                slide.style.transform = 'translateX(105%)';
                slide.style.zIndex = 0;
                slide.style.opacity = '0';
                slide.style.display = 'none'; // Hide them completely
            }
        });
    }

    function changeSlideReviews(direction) {
        currentSlide2 = (currentSlide2 + direction + totalSlides2) % totalSlides2;
        updateSlidePositions();
    }

    slides2.forEach((slide, index) => {
        slide.style.position = 'absolute';
        slide.style.top = '0';
        slide.style.left = '0';
        slide.style.width = '100%';
        slide.style.height = '100%';
        slide.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
    });

    let startXReviews = 0;
    let currentXReviews = 0;
    let isDraggingReviews = false;

    const sliderContainerReviews = document.querySelector('.slideshow2');

    sliderContainerReviews.addEventListener('touchstart', (e) => {
        startXReviews = e.touches[0].clientX;
        isDraggingReviews = true;
        clearInterval(autoSlideIntervalReviews); // Stop auto-scrolling on user interaction
    });

    sliderContainerReviews.addEventListener('touchmove', (e) => {
        if (!isDraggingReviews) return;
        currentXReviews = e.touches[0].clientX;
        const deltaX = Math.abs(currentXReviews - startXReviews);

        if (deltaX > 10) e.preventDefault(); // Prevent scrolling while dragging
    }, { passive: false });

    sliderContainerReviews.addEventListener('touchend', () => {
        if (!isDraggingReviews) return;
        const deltaX = currentXReviews - startXReviews;
        if (deltaX > 50) {
            changeSlideReviews(-1); // Move to previous slide
        } else if (deltaX < -50) {
            changeSlideReviews(1); // Move to next slide
        }
        startXReviews = 0;
        currentXReviews = 0;
        isDraggingReviews = false;
    });

    function startAutoSlideReviews() {
        autoSlideIntervalReviews = setInterval(() => {
            changeSlideReviews(autoSlideDirectionReviews);
        }, 4500);
    }

    startAutoSlideReviews();
    updateSlidePositions();
});