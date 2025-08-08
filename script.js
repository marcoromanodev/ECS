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
            document.getElementById('contact-form').reset();  // Clear the form fields
        }, function(error) {
            alert('Failed to send message, please try again.');
        });
});

// Select all the navigation links
const navLinks = document.querySelectorAll('nav ul li a');
const nav = document.querySelector('nav');
const logo = document.querySelector('.logo');
const header = document.querySelector('header');
const logoContainer = document.querySelector('.logo-container');

// Ensure nav links stay visible
function ensureNavLinkVisibility() {
    navLinks.forEach(link => {
        link.style.color = 'white';
    });
}

// Sections for scroll-based active link handling
const sections = document.querySelectorAll('section[id]');

// Highlight navigation links based on scroll position
function highlightNavLink() {
    const offset = nav.offsetHeight + logoContainer.offsetHeight; // Account for logo and nav heights
    const scrollPos = window.scrollY + offset;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`nav ul li a[href="#${id}"]`);

        if (scrollPos >= top && scrollPos < bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Update header, logo, and active nav links based on scroll
function updateHeader() {
    if (window.scrollY > 100) {
        header.classList.add('sticky');
        logo.classList.add('small');
    } else {
        header.classList.remove('sticky');
        logo.classList.remove('small');
    }
    ensureNavLinkVisibility();
    highlightNavLink();
}

// Call updateHeader on scroll and when the page loads
window.addEventListener('scroll', updateHeader);
document.addEventListener('DOMContentLoaded', updateHeader);

// Select carousel elements
const carousel = document.querySelector('.carousel-images');
const carouselImages = document.querySelectorAll('.carousel-img');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

// Initialize carousel only if images are present
if (carousel && carouselImages.length > 0 && leftArrow && rightArrow) {
    // Set initial index and image width
    let currentIndex = 0;
    const totalImages = carouselImages.length;
    const imagesToShow = 3;
    let imageWidth = carouselImages[0].clientWidth + 20;

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
        updateCarousel();
    });
}

// Scroll to the section specified in the URL hash
function scrollToTarget() {
    const selector = window.location.hash;
    if (selector) {
        const target = document.querySelector(selector);
        if (target) {
            // Wait for layout to stabilize, then account for the fixed header height
            requestAnimationFrame(() => {
                const offset = nav.offsetHeight + logoContainer.offsetHeight;
                const yOffset = target.offsetTop - offset;
                window.scrollTo({ top: yOffset, behavior: 'smooth' });
            });
        }
    }
}

// Adjust scroll position for hash links on load and hash changes
window.addEventListener('load', () => {
    updateHeader();
    scrollToTarget();
});

window.addEventListener('hashchange', scrollToTarget);

