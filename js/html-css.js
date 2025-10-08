
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("aside a");
    const sections = document.querySelectorAll("article .content-section");

    // Hide all sections initially
    sections.forEach(sec => sec.style.display = "none");

    // Show first section by default (optional)
    if (sections.length > 0) {
        sections[0].style.display = "block";
    }

    // Add click event to each aside link
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();

            // Hide all sections
            sections.forEach(sec => sec.style.display = "none");

            // Get the target section id
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            // Show the clicked section
            if (targetSection) {
                targetSection.style.display = "block";
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
