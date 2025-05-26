// scripts/characters.js
import { setupBasePage } from './basepage.js';
import { paragraph, strong, createCardSection } from './global.js';

const characters = [
  {
    name: "Sinco",
    description: "Teenager speedster protecting Tempo City by any means necessary."
  },
  {
    name: "TJ",
    description: "Best-friend of Sinco, another teenager speedster. TJ however protects Boredom City instead."
  },
  {
    name: "Tirok",
    description: "Anti-hero engineer scientist focused on his own beliefs."
  },
  {
    name: "Osin",
    description: "Clone of Sinco made by Tirok. Treats Tirok like a father figure."
  },
  {
    name: "Docaci",
    description: "Mother of Sinco, speedster who got her powers disabled by Tirok."
  },
  {
    name: "Karo",
    description: "Sinco's grandfather. Speedster, the first person to turn super on Earth, and the reason Docaci and Sinco have speedster powers now."
  }
];

function renderCharacterCard(character) {
  return createCardSection(
    strong(character.name),
    paragraph(character.description)
  );
}

function getCharactersContent() {
  return characters.map(renderCharacterCard).join('');
}

document.addEventListener("DOMContentLoaded", () => {
  const main = setupBasePage("../");
  main.innerHTML = getCharactersContent();
});
