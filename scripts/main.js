import {
  createHeader,
  createNavbar,
  createCardSection,
  createFooter,
  strong,
  italic,
  span,
  link,
  paragraph,
  list
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
    createCardSection("Welcome to The Sinco Retold Wiki", paragraph(
      "This fan-maintained encyclopedia documents the lore, characters, events, and universe of",
      strong("Sinco Retold") + ".",
      "Whether you're a new reader or a returning veteran, this wiki will help you dive deeper into the story."
    )) +

    createCardSection("Featured Article", paragraph(
      strong("The Siege of Halden’s Rise"),
      "— One of the most pivotal battles in Sinco history. Learn how the conflict shaped the political landscape of the Third Age.",
      link("Read more...", "#")
    )) +

    createCardSection("Recent Updates", list([
      strong("May 25:") + " Added new details to the " + span("Sky Reavers", "tag") + " faction page.",
      strong("May 20:") + " Timeline updated with entries from the Dawnfall Arc.",
      strong("May 18:") + " New artwork added to the character profile of Lysira."
    ]));

  footer.innerHTML = createFooter(2025, "The Sinco Retold Wiki");
});
