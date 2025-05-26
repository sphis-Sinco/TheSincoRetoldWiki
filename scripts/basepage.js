// scripts/basepage.js
import { createHeader, createNavbar, createFooter } from './global.js';

export const navItems = [
  { href: "./index.html", label: "Home" },
  { href: "./pages/characters.html", label: "Characters" },
  { href: "./pages/timeline.html", label: "Timeline" },
  { href: "./pages/locations.html", label: "Locations" },
  { href: "./pages/community.html", label: "Community" }
];

export function setupBasePage() {
  const header = document.getElementById("header");
  const navbar = document.getElementById("navbar");
  const footer = document.getElementById("footer");

  header.innerHTML = createHeader("The Sinco Retold Wiki", "The official site and definitive lore archive.");
  navbar.innerHTML = createNavbar(navItems);
  footer.innerHTML = createFooter(new Date().getFullYear(), "The Sinco Retold Wiki");

  return document.getElementById("main-content");
}
