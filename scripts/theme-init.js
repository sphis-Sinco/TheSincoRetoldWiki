// scripts/theme-init.js
const storedTheme = localStorage.getItem("preferredTheme");
if (storedTheme === "dark") {
  document.documentElement.classList.add("dark-theme");
} else if (storedTheme === "light") {
  document.documentElement.classList.add("light-theme");
}