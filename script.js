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
const heroSection = document.querySelector('#hero');

// Function to handle sticky navigation and logo resizing
function handleNavPosition() {
    const heroBottom = heroSection ? heroSection.offsetHeight : 0;
    const logoHeight = logoContainer.offsetHeight;

    if (window.scrollY >= heroBottom) {
        nav.classList.add('fixed');
        logo.classList.add('small');  // Shrink logo when scrolling
        nav.style.top = `${logoHeight - 30}px`;  // Adjust nav top position when scrolling
    } else {
        nav.classList.remove('fixed');
        logo.classList.remove('small');
        nav.style.top = `${logoHeight}px`;  // Reset nav position below the full-sized logo
    }
}

// Ensure nav links stay visible
function ensureNavLinkVisibility() {
    navLinks.forEach(link => {
        link.style.color = 'white';  // Ensure nav links are white
    });
}

// Function to handle section highlighting
function handleSectionHighlight() {
    const sections = document.querySelectorAll('section');
    let scrollPosition = window.scrollY + window.innerHeight / 3;

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

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#contact') {
                link.classList.add('active');
            }
        });
    }
}

// Call functions on scroll
window.addEventListener('scroll', () => {
    handleNavPosition();
    handleSectionHighlight();
    ensureNavLinkVisibility();  // Make sure links are white on scroll
});

// Ensure the active section is correct and links are visible on page load
document.addEventListener('DOMContentLoaded', () => {
    handleNavPosition();
    handleSectionHighlight();
    ensureNavLinkVisibility();  // Make sure links are white on load
});

// Select carousel elements
const carousel = document.querySelector('.carousel-images');
const carouselImages = document.querySelectorAll('.carousel-img');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

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

// Function to adjust the navigation bar's position under the logo
function adjustNavPosition() {
    const logoHeight = logoContainer.offsetHeight;
    nav.style.top = `${logoHeight}px`; // Dynamically adjust nav based on logo container height
}

// Scroll event handler to adjust logo size and navigation
window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
    adjustNavPosition(); // Reposition the nav on scroll
});

// Adjust the nav position on page load
window.addEventListener('load', adjustNavPosition);

// Adjust the nav position on window resize
window.addEventListener('resize', adjustNavPosition);

// Ensure the nav starts in the correct position on page load
document.addEventListener('DOMContentLoaded', handleNavPosition);
