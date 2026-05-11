// Main JavaScript for Pinnacle Shield Insurance

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for same-page section links in the navbar
    const navAnchors = document.querySelectorAll('.navbar a[href*="#"]');

    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', event => {
            const rawHref = anchor.getAttribute('href');

            if (!rawHref || rawHref === '#') {
                return;
            }

            let url;
            try {
                url = new URL(rawHref, window.location.href);
            } catch {
                return;
            }

            const isSamePage =
                url.origin === window.location.origin &&
                url.pathname === window.location.pathname;

            if (!isSamePage || !url.hash) {
                return;
            }

            const target = document.querySelector(url.hash);
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', url.hash);
        });
    });

    // Highlight current page in navbar
    const currentLocation = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentLocation) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });

    console.log('Pinnacle Shield Insurance - Page loaded successfully');
});
