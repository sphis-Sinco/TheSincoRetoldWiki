// scripts/basepage.js
import { createHeader, createNavbar, createFooter } from './global.js';

export function setupBasePage(navItems) {
  const header = document.getElementById("header");
  const navbar = document.getElementById("navbar");
  const footer = document.getElementById("footer");

  header.innerHTML = createHeader("The Sinco Retold Wiki", "The official site and definitive lore archive.");
  navbar.innerHTML = createNavbar(navItems);
  footer.innerHTML = createFooter(new Date().getFullYear(), "The Sinco Retold Wiki");

  return document.getElementById("main-content");
}
