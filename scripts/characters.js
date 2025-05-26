import { setupBasePage } from './basepage.js';
import { paragraph, strong, createElement, createCardSection } from './global.js';

const characters = [
  {
    name: "Sinco",
    description: "Teenager speedster protecting Tempo City by any means necessary."
  },
  {
    name: "TJ",
    description: "Best-friend of Sinco, another teenager speedster, protecting Boredom City instead."
  },
  {
    name: "Tirok",
    description: "Anti-Hero engineer scientist focused on his own beliefs."
  },
  {
    name: "Osin",
    description: "Clone of Sinco made by Tirok, treats Tirok like a father figure."
  },
  {
    name: "Docaci",
    description: "Mother of Sinco, speedster who got her powers disabled by Tirok."
  },
  {
    name: "Karo",
    description: "Sinco's grandfather, speedster, the first person to turn super on Earth."
  }
];

function renderCharacterCard(character) {
  const content = paragraph(character.description);
  return createCardSection(character.name, content);
}

document.addEventListener('DOMContentLoaded', () => {
  const main = setupBasePage('../');
  main.appendChild(createElement('h1', {}, 'Characters'));
  characters.forEach(character => {
    main.appendChild(renderCharacterCard(character));
  });
});
