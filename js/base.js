
/* js/layout */
async function loadLayout() {
    try {
        const response = await fetch('/base.html');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        const header = doc.querySelector('#site-header').innerHTML;
        const footer = doc.querySelector('#site-footer').innerHTML;

        document.getElementById('header-container').innerHTML = header;
        document.getElementById('footer-container').innerHTML = footer;

        setupHamburgerNav(); // Setup hamburger after header loads
        setupDarkModeToggle(); // Setup dark mode toggle after header loads 

        // Dynamic Fiscal Year Display
        const startYear = 2025; // Year your project/company started
        const currentYear = new Date().getFullYear();

        // Show only last two digits of current year if different from start year
        const displayYear = (currentYear === startYear)
            ? startYear
            : `${startYear} - ${currentYear.toString().slice(-2)}`;

        document.getElementById("fiscal-year").textContent = displayYear;
   
    } 
    catch (error) {
        console.error('Error loading layout:', error);
    }
}

// Hamburger Menu Setup
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


// Dark Mode Toggle 
function setupDarkModeToggle() {
    const toggleButton = document.getElementById('dark-mode-toggle');
    if (toggleButton) {
        // Load saved mode from localStorage
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'enabled') {
            document.body.classList.add('dark-mode');
            toggleButton.textContent = '☀️';
        }   
        toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                toggleButton.textContent = '☀️';    
                localStorage.setItem('darkMode', 'enabled');
            }
            else {
                toggleButton.textContent = '🌙';
                localStorage.setItem('darkMode', 'disabled');
            }   
        });
    }
}

window.addEventListener('DOMContentLoaded', loadLayout);