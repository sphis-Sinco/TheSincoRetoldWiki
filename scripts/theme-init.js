// theme-init.js
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const darkThemeClass = 'dark-theme';
  const toggleButton = document.getElementById('theme-toggle');

  if (savedTheme === 'dark') {
    document.body.classList.add(darkThemeClass);
    toggleButton.textContent = 'Switch to Light Theme';
  } else {
    document.body.classList.remove(darkThemeClass);
    toggleButton.textContent = 'Switch to Dark Theme';
  }
});