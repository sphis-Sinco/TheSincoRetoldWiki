// scripts/index.js
import { setupBasePage } from './basepage.js';

document.addEventListener("DOMContentLoaded", () => {
  const navItems = [
    { href: "./index.html", label: "Home" },
    { href: "./pages/characters.html", label: "Characters" },
    { href: "./pages/timeline.html", label: "Timeline" },
    { href: "./pages/locations.html", label: "Locations" },
    { href: "./pages/community.html", label: "Community" }
  ];

  const main = setupBasePage(navItems);

  main.innerHTML = `
    <h1>Welcome to The Sinco Retold Wiki</h1>
    <p>This is the official encyclopedia documenting the lore, characters, and world of <strong>Sinco Retold</strong>. Whether you're new or returning, this archive helps you dive deeper into the mythos.</p>
  `;
});
