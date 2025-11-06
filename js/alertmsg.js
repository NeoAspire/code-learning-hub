// JavaScript for Alert Message Box
window.addEventListener("load", function()
{
    const alertBox = document.getElementById("alert-box");
    const closeBtn = document.getElementById("alert-close-btn");
    closeBtn.addEventListener("click", function()
    {
        alertBox.style.display = "none";
    });
});