// =====================================================
// BOSTON HIGH SCHOOL - INTERACTIVE JAVASCRIPT
// =====================================================

// ========== SLIDESHOW FUNCTIONALITY ==========

let slideIndex = 1;
let slideTimer;

// Initialize slideshow on page load
window.addEventListener('DOMContentLoaded', function() {
    initializeSlideshow();
    setupMobileMenu();
    setupFormValidation();
});

function initializeSlideshow() {
    showSlide(slideIndex);
    autoSlide();
    
    // Add event listeners for prev/next buttons
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => changeSlide(-1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => changeSlide(1));
    }
    
    // Add keyboard navigation
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
}

function autoSlide() {
    slideTimer = setInterval(function() {
        slideIndex++;
        showSlide(slideIndex);
    }, 5000); // Change slide every 5 seconds
}

function changeSlide(n) {
    clearInterval(slideTimer);
    slideIndex += n;
    showSlide(slideIndex);
    autoSlide(); // Restart auto-sliding
}

function showSlide(n) {
    const slides = document.getElementsByClassName('slide');
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    
    // Show current slide
    if (slides.length > 0) {
        slides[slideIndex - 1].style.display = 'block';
    }
}

// ========== MOBILE HAMBURGER MENU ==========

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(15px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-15px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
}

// ========== FORM VALIDATION ==========

function setupFormValidation() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous error messages
            clearErrorMessages();
            
            // Validate form fields
            let isValid = true;
            
            // Validate Full Name
            const fullName = document.getElementById('fullName');
            if (!fullName.value.trim()) {
                showError('nameError', 'Full name is required');
                isValid = false;
            } else if (fullName.value.trim().length < 3) {
                showError('nameError', 'Name must be at least 3 characters');
                isValid = false;
            }
            
            // Validate Email
            const email = document.getElementById('email');
            if (!email.value.trim()) {
                showError('emailError', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate Phone
            const phone = document.getElementById('phone');
            if (!phone.value.trim()) {
                showError('phoneError', 'Phone number is required');
                isValid = false;
            } else if (!isValidPhone(phone.value)) {
                showError('phoneError', 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate Program
            const program = document.getElementById('program');
            if (!program.value) {
                showError('programError', 'Please select a program');
                isValid = false;
            }
            
            // If all validations pass, submit the form
            if (isValid) {
                submitForm(form);
            }
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\\d\\s\\-\\+\\(\\)]{7,}$/;
    return phoneRegex.test(phone.replace(/\\s/g, ''));
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        errorElement.previousElementSibling.style.borderColor = '#dc3545';
    }
}

function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.classList.remove('show');
        if (element.previousElementSibling && element.previousElementSibling.tagName !== 'LABEL') {
            element.previousElementSibling.style.borderColor = '';
        }
    });
    
    // Reset input borders
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

function submitForm(form) {
    // Show success message
    const successMessage = document.getElementById('successMessage');
    const submitButton = form.querySelector('.submit-button');
    
    if (successMessage) {
        successMessage.style.display = 'block';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.6';
        
        // Reset form
        form.reset();
        
        // Hide success message after 5 seconds and reset button
        setTimeout(function() {
            successMessage.style.display = 'none';
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
        }, 5000);
    } else {
        alert('Thank you for registering! We will contact you soon.');
        form.reset();
    }
}

// ========== SMOOTH SCROLLING FOR NAVIGATION LINKS ==========

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll behavior to all navigation links
    const navLinks = document.querySelectorAll('a[href^=\"#\"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ========== SCROLL ANIMATIONS ==========

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

window.addEventListener('load', function() {
    // Observe cards for animation
    const cards = document.querySelectorAll('.highlight-card, .program-card, .leader-card, .gallery-item, .faq-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ========== ACTIVE NAV LINK HIGHLIGHTING ==========

window.addEventListener('load', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ========== BACK TO TOP BUTTON ==========

function createBackToTopButton() {
    const button = document.createElement('button');
    button.id = 'backToTop';
    button.innerHTML = '↑';
    button.style.cssText = `position: fix
    ed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: var(--white);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        z-index: 999;
        display: none;
        transition: all 0.3s ease;
        font-weight: bold;`;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseover', function() {
        button.style.backgroundColor = 'var(--secondary-color)';
        button.style.color = 'var(--primary-color)';
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseout', function() {
        button.style.backgroundColor = 'var(--primary-color)';
        button.style.color = 'var(--white)';
        button.style.transform = 'scale(1)';
    });
}

window.addEventListener('load', createBackToTopButton);

// ========== LAZY LOADING IMAGES ==========

function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src || image.src;
                    image.classList.add('loaded');
                    observer.unobserve(image);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

window.addEventListener('load', setupLazyLoading);

// ========== LOG MESSAGE ==========

console.log(' - All scripts loaded successfully!');
console.log('Thank you for visiting our website.');
// ========== SIMPLE RANDOM QUOTES ==========
const quotes = [
    { text: "Education is the most powerful weapon.", author: "Nelson Mandela" },
    { text: "Learning is fun!", author: "School director" },
    { text: "Believe in yourself.", author: "Kagoda Hamidu" },
    { text: "In Boston we share knowledge and grow together.", author: "HE. MUBIRU TECH" },
    { text: "dont procrastinate", author: "Hellena B" }
]

function showRandomQuote() {
    const quoteElement = document.getElementById('quote-display');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.innerHTML = `"${randomQuote.text}" <br>— ${randomQuote.author}`;
    // Trigger fade animation
    quoteElement.style.animation = 'none';
    setTimeout(() => {
        quoteElement.style.animation = 'fadeIn 0.5s ease-in';
    }, 10);
}

window.addEventListener('load', function() {
    setTimeout(showRandomQuote, 2000);
});
document.getElementById('new-quote-btn').addEventListener('click', showRandomQuote);