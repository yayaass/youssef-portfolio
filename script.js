/**
 * Youssef Mohamed El Said - Portfolio
 * Production-ready JavaScript | No dependencies
 * Handles: Navigation, scroll effects, form validation, animations
 */

(function () {
    'use strict';

    // ==================== DOM References ====================
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    // ==================== Mobile Navigation ====================
    function openMenu() {
        navMenu.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('show');
        document.body.style.overflow = '';
    }

    if (navToggle) navToggle.addEventListener('click', openMenu);
    if (navClose) navClose.addEventListener('click', closeMenu);

    navLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (e) {
        if (navMenu.classList.contains('show') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // ==================== Sticky Header Scroll Effect ====================
    function onScroll() {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }

    window.addEventListener('scroll', onScroll);
    onScroll();

    // ==================== Smooth Scroll for Anchor Links ====================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==================== Active Navigation Link ====================
    const sections = document.querySelectorAll('section[id]');

    function setActiveNav() {
        const scrollY = window.pageYOffset;
        let current = 'hero';

        sections.forEach(function (section) {
            if (scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);
    setActiveNav();

    // ==================== Scroll Reveal Animation ====================
    const revealElements = document.querySelectorAll(
        '.about__grid, .education__card, .skill-card, .timeline__item, .project-card, .cert-card, .contact__intro, .contact__links, .contact__form'
    );

    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.05
    };

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(function (el) {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Stagger project cards
    document.querySelectorAll('.project-card').forEach(function (card, i) {
        card.style.transitionDelay = i * 0.05 + 's';
    });

    // ==================== Contact Form Validation ====================
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form__message show ' + type;
        formMessage.setAttribute('role', 'alert');
    }

    function hideMessage() {
        formMessage.className = 'form__message';
        formMessage.textContent = '';
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            // Reset error states
            [nameInput, emailInput, messageInput].forEach(function (input) {
                input.classList.remove('error');
            });
            hideMessage();

            // Validation
            let isValid = true;

            if (!nameInput.value.trim()) {
                nameInput.classList.add('error');
                isValid = false;
            }

            if (!emailInput.value.trim()) {
                emailInput.classList.add('error');
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                emailInput.classList.add('error');
                showMessage('Please enter a valid email address.', 'error');
                isValid = false;
            }

            if (!messageInput.value.trim()) {
                messageInput.classList.add('error');
                isValid = false;
            }

            if (!isValid && !formMessage.classList.contains('show')) {
                showMessage('Please fill in all required fields correctly.', 'error');
                return;
            }

            // Simulate submit (frontend only - connect to backend/Formspree for production)
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(function () {
                showMessage('Thank you! Your message has been received. I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                setTimeout(hideMessage, 5000);
            }, 800);
        });
    }

    // ==================== Console ====================
    console.log('%cYahia Mohamed Abdelrady', 'font-size: 14px; font-weight: bold; color: #2563eb;');
    console.log('%cSoftware Engineer · Full Stack .NET Developer', 'font-size: 11px; color: #94a3b8;');
    
})();
