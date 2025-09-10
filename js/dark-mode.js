document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Initialize mode and icon
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        toggleButton.textContent = '☀️';  // Sun icon in dark mode
    } else {
        toggleButton.textContent = '🌙';  // Moon icon in light mode
    }

    toggleButton.addEventListener('click', function () {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
            toggleButton.textContent = '☀️';  // Show sun when dark mode is active
        } else {
            localStorage.setItem('dark-mode', 'disabled');
            toggleButton.textContent = '🌙';  // Show moon when light mode is active
        }
    });
});
