import { createHeader, createNavbar, createFooter } from './global.js';

const characters = [
  {
    name: "Slate",
    description: "The determined commander navigating the perils of Sinco Retold.",
  },
  {
    name: "Echo",
    description: "A mysterious shapeshifter with unclear motives.",
  },
  {
    name: "Vera",
    description: "A sharp technician who senses hidden threats.",
  }
];

function renderCharacterCard(character) {
  return `
    <section class="character-card">
      <h2>${character.name}</h2>
      <p>${character.description}</p>
    </section>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const navbar = document.getElementById("navbar");
  const main = document.getElementById("main-content");
  const footer = document.getElementById("footer");

  header.innerHTML = createHeader("The Sinco Retold Wiki", "The official site and definitive lore archive.");
  navbar.innerHTML = createNavbar([
    { href: "../index.html", label: "Home" },
    { href: "#", label: "Characters" },
    { href: "../timeline.html", label: "Timeline" },
    { href: "../locations.html", label: "Locations" },
    { href: "../community.html", label: "Community" }
  ]);

  main.innerHTML = `
    <h1>Characters</h1>
    ${characters.map(renderCharacterCard).join('')}
  `;

  footer.innerHTML = createFooter(2025, "The Sinco Retold Wiki");
});
