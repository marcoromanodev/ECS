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

// Sections for scroll-based active link handling
const sections = document.querySelectorAll('section[id]');

// Highlight navigation links based on scroll position
function highlightNavLink() {
    const offset = nav.offsetHeight + 50; // Offset to account for the fixed nav
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

// Call functions on scroll
window.addEventListener('scroll', () => {
    handleNavPosition();
    ensureNavLinkVisibility();  // Make sure links are white on scroll
    highlightNavLink();
});

// Ensure the active section is correct and links are visible on page load
document.addEventListener('DOMContentLoaded', () => {
    handleNavPosition();
    ensureNavLinkVisibility();  // Make sure links are white on load
    highlightNavLink();
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

// Load and display Google reviews
window.initReviews = function () {
    const placeId = 'REPLACE_WITH_GOOGLE_PLACE_ID'; // Replace with your Google Place ID
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails({ placeId, fields: ['reviews'] }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            const container = document.getElementById('google-reviews');
            place.reviews.slice(0, 3).forEach(review => {
                const reviewEl = document.createElement('div');
                reviewEl.className = 'review';
                reviewEl.innerHTML = `
                    <div class="review-rating">${'★'.repeat(Math.round(review.rating))}${'☆'.repeat(5 - Math.round(review.rating))}</div>
                    <p class="review-text">"${review.text}"</p>
                    <p class="review-author">- ${review.author_name}</p>
                `;
                container.appendChild(reviewEl);
            });
        }
    });
};

