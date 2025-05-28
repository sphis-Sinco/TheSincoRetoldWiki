// scripts/theme.js
const THEME_KEY = "preferredTheme";
const toggleBtn = document.getElementById("theme-toggle");

function applyStoredThemeLabel() {
  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme === "dark") {
    toggleBtn.textContent = "Switch to Light Theme";
  } else {
    toggleBtn.textContent = "Switch to Dark Theme";
  }
}

function toggleTheme() {
  if (document.documentElement.classList.contains("dark-theme")) {
    document.documentElement.classList.remove("dark-theme");
    document.documentElement.classList.add("light-theme");
    localStorage.setItem(THEME_KEY, "light");
    toggleBtn.textContent = "Switch to Dark Theme";
  } else {
    document.documentElement.classList.remove("light-theme");
    document.documentElement.classList.add("dark-theme");
    localStorage.setItem(THEME_KEY, "dark");
    toggleBtn.textContent = "Switch to Light Theme";
  }
}

if (toggleBtn) {
  applyStoredThemeLabel();
  toggleBtn.addEventListener("click", toggleTheme);
}