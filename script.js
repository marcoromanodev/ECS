// Initialize EmailJS
(function() {
    emailjs.init("0L5svOXr2vc7kf_fS"); // Replace with your EmailJS user ID
})();

// Handle form submission when the contact form exists
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        emailjs.sendForm('service_1nuwebf', 'template_lhqncse', this)
            .then(function() {
                alert('Message sent successfully!');
                contactForm.reset();  // Clear the form fields
            }, function(error) {
                alert('Failed to send message, please try again.');
            });
    });
}

// Select navigation links and contact links
const navLinks = document.querySelectorAll('nav ul li a');
const nav = document.querySelector('nav');
const logo = document.querySelector('.logo');
const header = document.querySelector('header');
const logoContainer = document.querySelector('.logo-container');
const contactLinks = document.querySelectorAll('.contact-link');

// Ensure nav links stay visible
function ensureNavLinkVisibility() {
    navLinks.forEach(link => {
        // Use inline styles with !important so widgets can't override the color
        link.style.setProperty('color', 'white', 'important');
    });
}

// Handle contact links to account for fixed header across pages
contactLinks.forEach(link => {
    // Ensure links point to the contact section on the index page
    if (link.getAttribute('href') === '#contact' && !window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
        link.setAttribute('href', 'index.html#contact');
    }

    link.addEventListener('click', event => {
        // On the index page, smooth scroll with header offset
        const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '';
        if (isIndex) {
            event.preventDefault();
            const target = document.querySelector('#contact');
            if (target) {
                const offset = nav.offsetHeight + logoContainer.offsetHeight;
                const yOffset = target.offsetTop - offset;
                window.scrollTo({ top: yOffset, behavior: 'smooth' });
            }
        }
    });
});

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
    // Re-run after asynchronous widgets load
    setTimeout(scrollToTarget, 500);
});

window.addEventListener('hashchange', scrollToTarget);

// Re-scroll when dynamic review widget alters page height
const reviewsWidget = document.querySelector('.reviews-widget');
if (reviewsWidget) {
    const observer = new MutationObserver(() => {
        // Widget load can inject styles that hide nav links or shift layout
        scrollToTarget();
        ensureNavLinkVisibility();
        highlightNavLink();
        observer.disconnect();
    });
    observer.observe(reviewsWidget, { childList: true, subtree: true });
}

// Load Google rating and review count for the widget under the hero quote
async function loadGoogleRating() {
    const container = document.getElementById('google-rating');
    if (!container) return;

    const googleProfileUrl = 'https://www.google.com/maps/place/Elite+Clear+Services/';

    function render(rating, reviews) {
        const maxStars = 5;
        let starsHtml = '';
        for (let i = 1; i <= maxStars; i++) {
            starsHtml += i <= Math.floor(rating)
                ? '<i class="fas fa-star"></i>'
                : '<i class="far fa-star"></i>';
        }
        container.innerHTML = `<a href="${googleProfileUrl}" target="_blank"><span class="rating-number">${rating.toFixed(1)}</span><span class="stars">${starsHtml}</span><span class="rating-count">(${reviews} Ratings & Reviews)</span></a>`;
    }

    try {
        const apiKey = 'YOUR_API_KEY'; // Replace with your Google API key
        const placeId = 'PLACE_ID'; // Replace with your Place ID
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total&key=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (data.status !== 'OK') throw new Error('API response not OK');
        render(data.result.rating, data.result.user_ratings_total);
    } catch (error) {
        // Default to 5 stars and 14 reviews on failure
        render(5, 14);
    }
}

document.addEventListener('DOMContentLoaded', loadGoogleRating);
