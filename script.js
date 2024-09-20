// Initialize EmailJS
(function() {
    emailjs.init("0L5svOXr2vc7kf_fS"); // Replace with your EmailJS user ID
})();

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    emailjs.sendForm('service_1nuwebf', 'template_lhqncse', this)
        .then(function() {
            alert('Message sent successfully!');
        }, function(error) {
            alert('Failed to send message, please try again.');
        });
});

// Select all the navigation links
const navLinks = document.querySelectorAll('nav ul li a');

// Function to handle section highlighting
function handleSectionHighlight() {
    const sections = document.querySelectorAll('section');
    let scrollPosition = window.scrollY + window.innerHeight;

    // Highlight home section if we're near the top
    if (window.scrollY === 0) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#hero') {
                link.classList.add('active');
            }
        });
    } else {
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const sectionOffset = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionOffset && scrollPosition < sectionOffset + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Special case: highlight contact section when reaching the bottom
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#contact') {
                    link.classList.add('active');
                }
            });
        }
    }
}

// Call function on scroll
window.addEventListener('scroll', handleSectionHighlight);

// Ensure the active section is correct on page load
document.addEventListener('DOMContentLoaded', handleSectionHighlight);

// Select carousel elements
const carousel = document.querySelector('.carousel-images');
const carouselImages = document.querySelectorAll('.carousel-img');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

// Set initial index and image width
let currentIndex = 0;
const totalImages = carouselImages.length;
const imagesToShow = 3;  // Showing 3 images at a time
let imageWidth = carouselImages[0].clientWidth + 20; // Image width + margin/padding

// Right arrow click event
rightArrow.addEventListener('click', () => {
    if (currentIndex < totalImages - imagesToShow) {
        currentIndex++;
        updateCarousel();
    }
});

// Left arrow click event
leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Function to update the carousel's position
function updateCarousel() {
    const newTransformValue = -currentIndex * imageWidth;
    carousel.style.transform = `translateX(${newTransformValue}px)`;
}

// Update image width on window resize to ensure responsiveness
window.addEventListener('resize', () => {
    imageWidth = carouselImages[0].clientWidth + 20;
    updateCarousel();  // Recalculate and update the transform position
});

// Select the nav and logo elements
const nav = document.querySelector('nav');
const heroSection = document.querySelector('#hero');

// Function to handle the sticky navigation effect
function handleNavPosition() {
    const heroBottom = heroSection.offsetHeight;

    if (window.scrollY >= heroBottom) {
        nav.classList.add('fixed');  // Add fixed class when scrolled past the hero section
    } else {
        nav.classList.remove('fixed');  // Remove fixed class when at the top
    }
}

// Call function on scroll
window.addEventListener('scroll', handleNavPosition);

// Ensure the nav starts in the correct position on page load
document.addEventListener('DOMContentLoaded', handleNavPosition);
