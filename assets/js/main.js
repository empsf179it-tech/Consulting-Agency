/**
 * VAYRIX CONSULTING - MAIN JAVASCRIPT
 * Handles animations, interactions, and single-page routing
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==================================================================
    // 1. PAGE LOADER
    // ==================================================================
    const loaderPercentage = document.getElementById('loaderPercentage');
    const loaderBar = document.getElementById('loaderBar');
    const pageLoader = document.getElementById('pageLoader');
    let loadProgress = 0;
    
    // Simulate loading progress
    const loadInterval = setInterval(() => {
        loadProgress += Math.floor(Math.random() * 10) + 5;
        if (loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(loadInterval);
            finishLoading();
        }
        loaderPercentage.textContent = loadProgress + '%';
        loaderBar.style.width = loadProgress + '%';
    }, 100);

    function finishLoading() {
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            document.body.classList.remove('loading-state');
            setTimeout(() => {
                pageLoader.style.display = 'none';
                initGSAPAnimations(); // Initialize animations after load
            }, 1000);
        }, 500);
    }



    // ==================================================================
    // 3. NAVIGATION (Sticky, Active State, Smooth Scroll Links)
    // ==================================================================
    const mainNav = document.getElementById('mainNav');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.desktop-menu .nav-link, .mobile-nav-link');

    // Sticky Nav
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });

    // Update active link on scroll
    const updateActiveLink = () => {
        let scrollPos = window.scrollY || document.documentElement.scrollTop;
        scrollPos += window.innerHeight * 0.4; // Offset for trigger point

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', updateActiveLink);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80; // Offset for navbar
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                if(mobileMenuPanel.classList.contains('active')) {
                    closeMobileMenu();
                }
            }
        });
    });

    // ==================================================================
    // 4. MOBILE MENU
    // ==================================================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuPanel = document.getElementById('mobileMenuPanel');
    const mobileCloseLink = document.querySelector('.mobile-close-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileMenu() {
        mobileMenuOverlay.classList.add('active');
        mobileMenuPanel.classList.add('active');
        // Animate links in
        gsap.to(mobileLinks, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.2
        });
    }

    function closeMobileMenu() {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuPanel.classList.remove('active');
        // Reset links
        gsap.to(mobileLinks, {
            y: 20,
            opacity: 0,
            duration: 0.3
        });
    }

    mobileMenuBtn.addEventListener('click', openMobileMenu);
    closeMenuBtn.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    mobileCloseLink.addEventListener('click', closeMobileMenu);

    // ==================================================================
    // 5. MAGNETIC BUTTONS (Micro-interaction)
    // ==================================================================
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                duration: 0.3,
                x: x * 0.2,
                y: y * 0.2,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(btn, {
                duration: 0.3,
                x: 0,
                y: 0,
                ease: 'power2.out'
            });
        });
    });

    // ==================================================================
    // 6. GSAP ANIMATIONS & SCROLLTRIGGER
    // ==================================================================
    gsap.registerPlugin(ScrollTrigger);

    function initGSAPAnimations() {
        // SplitText Reveals for Headings
        const splitTextElements = document.querySelectorAll('.split-text');
        
        splitTextElements.forEach(el => {
            const split = new SplitType(el, { types: 'lines, words' });
            
            gsap.from(split.words, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.05,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                }
            });
        });

        // Subtext / Lead text fade in
        gsap.utils.toArray('.section-lead, .hero-subtext').forEach(el => {
            gsap.from(el, {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                }
            });
        });






        // Initialize CountUp when stats are in view
        ScrollTrigger.create({
            trigger: '#statsRow',
            start: 'top 85%',
            once: true,
            onEnter: () => {
                const statEls = document.querySelectorAll('.stat-number span[data-count]');
                statEls.forEach(el => {
                    const target = parseFloat(el.getAttribute('data-count'));
                    const decimals = el.getAttribute('data-decimal') ? parseInt(el.getAttribute('data-decimal')) : 0;
                    
                    const countUp = new countUp.CountUp(el, target, {
                        decimalPlaces: decimals,
                        duration: 3,
                        separator: ','
                    });
                    if (!countUp.error) {
                        countUp.start();
                    }
                });
            }
        });
    }

    // ==================================================================
    // 7. SWIPER (CASE STUDIES)
    // ==================================================================
    const csSwiper = new Swiper('.case-studies-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 800,
        simulateTouch: true,
        grabCursor: true,
    });

    // ==================================================================
    // 8. INDUSTRY SELECTOR
    // ==================================================================
    const indBtns = document.querySelectorAll('.industry-btn');
    const indContents = document.querySelectorAll('.industry-content');

    indBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active from all
            indBtns.forEach(b => b.classList.remove('active'));
            indContents.forEach(c => {
                c.classList.remove('active');
            });
            
            // Add active to current
            this.classList.add('active');
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ==================================================================
    // 9. FORM SUBMISSION DEMO
    // ==================================================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Show loading state on button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            
            // Simulate API call
            setTimeout(() => {
                contactForm.style.opacity = '0';
                setTimeout(() => {
                    formSuccess.classList.add('active');
                }, 300);
            }, 1500);
        });
    }

    // ==================================================================
    // 10. SCROLL TO TOP BUTTON
    // ==================================================================
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
