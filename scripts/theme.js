// scripts/theme.js
const THEME_KEY = "preferredTheme";

function applyStoredTheme() {
  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme === "dark") {
    document.body.classList.add("dark-theme");
  } else if (storedTheme === "light") {
    document.body.classList.add("light-theme");
  }
}

function toggleTheme() {
  if (document.body.classList.contains("dark-theme")) {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    localStorage.setItem(THEME_KEY, "light");
  } else {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    localStorage.setItem(THEME_KEY, "dark");
  }
}

// Apply the theme immediately on load
applyStoredTheme();

// Optional: If you have a button
const toggleBtn = document.getElementById("theme-toggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", toggleTheme);
}