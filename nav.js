document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu elements
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMobileMenu = document.getElementById('closeMobileMenu');

    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileMenuBtn.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
    }

    // Close mobile menu
    function closeMobileMenuFunc() {
        mobileMenuBtn.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    closeMobileMenu.addEventListener('click', closeMobileMenuFunc);

    // Close menu when clicking on overlay
    mobileMenuOverlay.addEventListener('click', function (e) {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenuFunc();
        }
    });

    // Close menu when clicking on menu links
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-content a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenuFunc);
    });

    // Handle escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenuFunc();
        }
    });

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    closeMobileMenuFunc();
                }
            }
        });
    });

    // Header scroll effect (optional)
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const screenWidth = window.innerWidth;

        if (scrollTop <= 1) {
            // В самом верху — всегда показываем полностью
            header.style.transform = 'translateY(0)';
        } else if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Скроллим вниз — скрываем
            header.style.transform = 'translateY(-100%)';
        } else {
            // Скроллим вверх — показываем по условиям
            if (screenWidth >= 1200) {
                header.style.transform = 'translateY(-32%)'; // при больших экранах
            } else {
                header.style.transform = 'translateY(0)'; // при маленьких
            }
        }

        lastScrollTop = scrollTop;
    });


    // Add transition to header for smooth hide/show
    header.style.transition = 'transform 0.3s ease';

    // Language dropdown functionality (for desktop)
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        const langDropdown = languageSelector.querySelector('.lang-dropdown');
        const langLinks = langDropdown.querySelectorAll('a');
        const currentLangSpan = languageSelector.querySelector('.current-lang span');
        const currentLangImg = languageSelector.querySelector('.current-lang img');

        langLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const selectedLang = this.textContent;
                currentLangSpan.textContent = selectedLang;

                // Update flag image (you would need to implement this based on your flag images)
                const flagMap = {
                    'RU': '/placeholder.svg?height=20&width=20',
                    'UZ': '/placeholder.svg?height=20&width=20',
                    'EN': '/placeholder.svg?height=20&width=20'
                };

                if (flagMap[selectedLang]) {
                    currentLangImg.src = flagMap[selectedLang];
                }
            });
        });
    }

    // Mobile language selector functionality
    const mobileLangLinks = document.querySelectorAll('.mobile-language-selector a');
    mobileLangLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links
            mobileLangLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Update desktop language selector if exists
            const selectedLang = this.textContent;
            if (languageSelector) {
                const currentLangSpan = languageSelector.querySelector('.current-lang span');
                if (currentLangSpan) {
                    currentLangSpan.textContent = selectedLang;
                }
            }
        });
    });

    // Search functionality (placeholder)
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            // Implement search functionality here
            console.log('Search clicked');
            // You could show a search modal or redirect to search page
        });
    }

    // Donate button functionality (placeholder)
    const donateBtns = document.querySelectorAll('.donate-btn, .donate-btn-mobile');
    donateBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Implement donation functionality here
            console.log('Donate clicked');
            // You could redirect to donation page or show donation modal
        });
    });

    // Add loading animation for images
    // const images = document.querySelectorAll('img');
    // images.forEach(img => {
    //     img.addEventListener('load', function () {
    //         this.style.opacity = '1';
    //     });

    //     // Set initial opacity for smooth loading
    //     img.style.opacity = '0';
    //     img.style.transition = 'opacity 0.3s ease';
    // });

    // Intersection Observer for animations (optional)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.contact-card, .nav-links li, .additional-links li');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function () {
    // Add any scroll-based functionality here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);