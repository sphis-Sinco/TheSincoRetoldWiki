import {
  createHeader,
  createNavbar,
  createCardSection,
  createFooter
} from './global.js';

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const navbar = document.getElementById("navbar");
  const main = document.getElementById("main-content");
  const footer = document.getElementById("footer");

  header.innerHTML = createHeader("The Sinco Retold Wiki", "Your definitive guide to the reimagined world of Sinco");

  navbar.innerHTML = createNavbar([
    { href: "#", label: "Home" },
    { href: "#", label: "Characters" },
    { href: "#", label: "Timeline" },
    { href: "#", label: "Factions" },
    { href: "#", label: "Locations" },
    { href: "#", label: "Community" }
  ]);

  main.innerHTML =
    createCardSection("Welcome to The Sinco Retold Wiki", `
      <p>This official encyclopedia documents the lore, characters, events, and universe of <strong>Sinco Retold</strong>.
      Whether you're a new reader or a returning veteran, this wiki will help you dive deeper into the story.</p>
    `) +
    createCardSection("Featured Article", `
      <p>Nothing</p>
      <a href="#">Read more...</a>
    `) +
    createCardSection("Recent Updates", `
      <ul>
        <li><strong>May 25:</strong> Added new details to the "Sky Reavers" faction page.</li>
        <li><strong>May 20:</strong> Timeline updated with entries from the Dawnfall Arc.</li>
        <li><strong>May 18:</strong> New artwork added to the character profile of Lysira.</li>
      </ul>
    `);

  footer.innerHTML = createFooter(2025, "The Sinco Retold Wiki");
});
