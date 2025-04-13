document.addEventListener('DOMContentLoaded', () => {
    // Slideshow Management
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slide-nav.prev');
    const nextBtn = document.querySelector('.slide-nav.next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Initialize slideshow controls
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        startSlideshow();
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        startSlideshow();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            startSlideshow();
        });
    });

    // Auto-advance slides
    function startSlideshow() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Start the slideshow
    startSlideshow();

    // Pause slideshow on hover
    const slideshow = document.querySelector('.hero-slideshow');
    slideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slideshow.addEventListener('mouseleave', startSlideshow);

    // Modal Management
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const switchFormBtns = document.querySelectorAll('.switch-form');
    const ctaBtn = document.querySelector('.cta-btn');

    // Open modals
    loginBtn.addEventListener('click', () => openModal(loginModal));
    signupBtn.addEventListener('click', () => openModal(signupModal));
    ctaBtn.addEventListener('click', () => openModal(signupModal));

    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(loginModal);
            closeModal(signupModal);
        });
    });

    // Switch between login and signup forms
    switchFormBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetForm = btn.dataset.form;
            if (targetForm === 'login') {
                closeModal(signupModal);
                openModal(loginModal);
            } else {
                closeModal(loginModal);
                openModal(signupModal);
            }
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) closeModal(loginModal);
        if (e.target === signupModal) closeModal(signupModal);
    });

    // Form submission
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log('Form submitted:', data);
            // TODO: Add your API call here
            showNotification('Successfully submitted!');
            closeModal(loginModal);
            closeModal(signupModal);
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Utility functions
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function showNotification(message) {
    // You can implement a toast notification system here
    alert(message);
} 