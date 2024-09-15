document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector('.profile-menu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const closeBtn = document.querySelector('.sidebar .close-btn');

    // Function to open sidebar
    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('open');
    }

    // Function to close sidebar
    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
    }

    // Open the sidebar when menu button is clicked
    menuButton.addEventListener('click', openSidebar);

    // Close the sidebar when the close button or overlay is clicked
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
});
