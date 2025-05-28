// theme.js
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const darkThemeClass = 'dark-theme';

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add(darkThemeClass);
      toggleButton.textContent = 'Switch to Light Theme';
    } else {
      document.body.classList.remove(darkThemeClass);
      toggleButton.textContent = 'Switch to Dark Theme';
    }
    localStorage.setItem('theme', theme);
  }

  toggleButton.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });
});