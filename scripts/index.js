// scripts/index.js

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Function to apply the saved theme or default to dark
  function applyTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light-theme');
      themeToggleBtn.textContent = 'Switch to Dark Theme';
    } else {
      body.classList.remove('light-theme');
      themeToggleBtn.textContent = 'Switch to Light Theme';
    }
  }

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  applyTheme(savedTheme || 'dark');

  // Toggle theme on button click
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
});