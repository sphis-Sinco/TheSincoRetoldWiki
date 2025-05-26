// scripts/basepage.js
import { createHeader, createNavbar, createFooter } from './global.js';

const navItemsBase = [
  { href: "index.html", label: "Home" },
  { href: "pages/characters.html", label: "Characters" },
  { href: "pages/timeline.html", label: "Timeline" },
  { href: "pages/locations.html", label: "Locations" },
  { href: "pages/community.html", label: "Community" }
];

export function setupBasePage(basePath = "") {
  const header = document.getElementById("header");
  const navbar = document.getElementById("navbar");
  const footer = document.getElementById("footer");

  header.innerHTML = createHeader("The Sinco Retold Wiki", "The official site and definitive lore archive.");

  // Adjust hrefs by prefixing basePath
  const navItems = navItemsBase.map(item => ({
    href: basePath + item.href,
    label: item.label
  }));

  navbar.innerHTML = createNavbar(navItems);
  footer.innerHTML = createFooter(new Date().getFullYear(), "The Sinco Retold Wiki");

  return document.getElementById("main-content");
}
