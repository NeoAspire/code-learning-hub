
/* js/layout */
async function loadLayout() {
    try {
        const response = await fetch('layout.html');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        const header = doc.querySelector('#site-header').innerHTML;
        const footer = doc.querySelector('#site-footer').innerHTML;

        document.getElementById('header-container').innerHTML = header;
        document.getElementById('footer-container').innerHTML = footer;

        setupHamburgerNav(); // Add this line to setup hamburger after header loads
    } 
    catch (error) {
        console.error('Error loading layout:', error);
    }
}

function setupHamburgerNav() {
    const hamburger = document.querySelector('.nav-hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
        // Optional: Hide menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('show');
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', loadLayout);