import {
  createHeader,
  createNavbar,
  createCardSection,
  createFooter,
  strong,
  paragraph
} from './global.js';

import { renderChangelog } from './changelog.js';
import { renderFeaturedArticle } from './homepageContent.js';

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const navbar = document.getElementById("navbar");
  const main = document.getElementById("main-content");
  const footer = document.getElementById("footer");

  header.innerHTML = createHeader("The Sinco Retold Wiki", "The official site and definitive lore archive.");

  navbar.innerHTML = createNavbar([
    { href: "#", label: "Home" },
    { href: "#", label: "Characters" },
    { href: "#", label: "Timeline" },
    { href: "#", label: "Locations" },
    { href: "#", label: "Community" }
  ]);

  main.innerHTML =
    createCardSection("Welcome to The Sinco Retold Wiki", paragraph(
      "This is the official, fan-maintained encyclopedia documenting the lore, characters, and world of",
      strong("Sinco Retold") + ".",
      "Whether you're new or returning, this archive helps you dive deeper into the mythos."
    )) +
    createCardSection("Featured Article", renderFeaturedArticle()) +
    createCardSection("Recent Updates", renderChangelog());

  footer.innerHTML = createFooter(2025, "The Sinco Retold Wiki");
});
