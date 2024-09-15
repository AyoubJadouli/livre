// Define color schemes for light and dark modes
const lightModeColors = {
    '--background-color': '#ffffff',
    '--text-color': '#000000',
    '--menu-color': '#f8f9fa',
    '--link-color': '#007bff',
    '--slider-bg-color': '#e9ecef',
  };
  
  const darkModeColors = {
    '--background-color': '#121212',
    '--text-color': '#e0e0e0',
    '--menu-color': '#343a40',
    '--link-color': '#1a73e8',
    '--slider-bg-color': '#2a2a2a',
  };
  
  // Function to apply a color scheme
  function applyColorScheme(colorScheme) {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(colorScheme)) {
      root.style.setProperty(key, value);
    }
  }
  
  // Function to toggle dark mode
  function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
  
    if (isDarkMode) {
      applyColorScheme(darkModeColors);
      localStorage.setItem('darkMode', 'enabled');
    } else {
      applyColorScheme(lightModeColors);
      localStorage.setItem('darkMode', 'disabled');
    }
  }
  
  // Load the user's dark mode preference from localStorage
  function loadDarkModePreference() {
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'enabled') {
      document.body.classList.add('dark-mode');
      applyColorScheme(darkModeColors);
    } else {
      applyColorScheme(lightModeColors);
    }
  }
  
  // Add event listener to toggle dark mode when the button is clicked
  document.addEventListener('DOMContentLoaded', function () {
    const toggleDarkModeBtn = document.querySelector('#darkModeToggle');
    
    // Load the user's preference on page load
    loadDarkModePreference();
    
    // Attach click event to the toggle button
    if (toggleDarkModeBtn) {
      toggleDarkModeBtn.addEventListener('click', toggleDarkMode);
    }
  });
  