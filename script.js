document.addEventListener('DOMContentLoaded', () => {
    
    // Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500); // 1.5s loader

    // Helper for selecting elements
    const select = (el) => document.querySelector(el);
    const selectAll = (el) => document.querySelectorAll(el);

    // Mobile Menu
    const hamburger = select('.hamburger');
    const mobileMenu = select('.mobile-menu');
    const closeIcon = select('.close-icon');
    const menuLinks = selectAll('.mobile-menu ul li a');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeIcon.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // FAQ Accordion
    const accordionHeaders = selectAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = header.classList.contains('active');

            // Close all others
            selectAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });

            if (!isOpen) {
                header.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Modal Handling
    const modals = {
        'impressum': document.getElementById('impressum-modal'),
        'privacy': document.getElementById('privacy-modal'),
        'return': document.getElementById('return-policy-modal')
    };

    const triggers = {
        'impressum-link': 'impressum',
        'privacy-link': 'privacy',
        'return-policy-link': 'return',
        'floating-impressum': 'impressum',
        'floating-privacy': 'privacy',
        'cookie-privacy-link': 'privacy'
    };

    // Open Modals
    for (let id in triggers) {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = triggers[id];
                if (modals[modalId]) {
                    modals[modalId].style.display = 'block';
                }
            });
        }
    }

    // Close Modals
    selectAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
        });
    });

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Cookie Banner
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookies = document.getElementById('accept-cookies');
    const declineCookies = document.getElementById('decline-cookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.style.display = 'flex';
        }, 2000);
    } else {
        cookieBanner.style.display = 'none';
    }

    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.style.display = 'none';
    });

    declineCookies.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'false');
        cookieBanner.style.display = 'none';
    });

});
