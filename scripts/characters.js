import { setupBasePage } from './basepage.js';
import { paragraph, strong, createElement, createCardSection } from './global.js';

const characters = [
  {
    name: "Sinco",
    description: "Teenager speedster protecting Tempo City by any means necessary.",
    powerLevel: 1080,
    firstAppearance: 1,
    lastAppearance: 85,
    birthday: "2011-09-19",
    funFacts: ["Based off his creator heavily", "Died twice, both times getting some kind of special training"]
  },
  {
    name: "TJ",
    description: "Best-friend of Sinco, another teenager speedster, protecting Boredom City instead.",
    powerLevel: null,
    firstAppearance: 1,
    lastAppearance: 30,
    birthday: "2011-04-03",
    funFacts: []
  },
  {
    name: "Tirok",
    description: "Anti-Hero engineer scientist focused on his own beliefs.",
    powerLevel: 1,
    firstAppearance: 1,
    lastAppearance: 85,
    birthday: "2000-04-05",
    funFacts: ["Wishes for his own power"]
  },
  {
    name: "Osin",
    description: "Clone of Sinco made by Tirok, treats Tirok like a father figure.",
    powerLevel: 1020,
    firstAppearance: 1,
    lastAppearance: 85,
    birthday: "2023-10-08",
    funFacts: []
  },
  {
    name: "Docaci",
    description: "Mother of Sinco, speedster who got her powers disabled by Tirok.",
    powerLevel: null,
    firstAppearance: 24,
    lastAppearance: 55,
    birthday: "1993-03-14",
    funFacts: []
  },
  {
    name: "Karo",
    description: "Sinco's grandfather, speedster, the first person to turn super on Earth, and the reason Docaci and Sinco have speedster powers now.",
    powerLevel: null,
    firstAppearance: 47,
    lastAppearance: 61,
    birthday: "1974-06-23",
    funFacts: ["Made for a prequel book that tells the story of the first person to go super"]
  }
];

function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderCharacterCard(character) {
  const lines = [];

  lines.push(paragraph(character.description));

  lines.push('<ul>');
  lines.push(`<li>${strong("First Appearance:")} Issue #${character.firstAppearance}</li>`);
  lines.push(`<li>${strong("Last Appearance:")} Issue #${character.lastAppearance}</li>`);
  
  if (typeof character.powerLevel === 'number') {
    lines.push(`<li>${strong("Power Level:")} ${character.powerLevel}</li>`);
  }
  
  if (character.birthday) {
    lines.push(`<li>${strong("Birthday:")} ${formatDate(character.birthday)}</li>`);
  }
  
  if (character.funFacts && character.funFacts.length) {
    lines.push('<li>');
    lines.push(strong("Fun Facts:"));
    lines.push('<details><summary>Click to expand</summary><ul>');
    character.funFacts.forEach(fact => lines.push(`<li>${fact}</li>`));
    lines.push('</ul></details></li>');
  }
  
  lines.push('</ul>');

  return createCardSection(character.name, lines.join(''));
}

document.addEventListener("DOMContentLoaded", () => {
  const main = setupBasePage("../");

  main.appendChild(createElement("h1", {}, "Characters"));

  characters.forEach(character => {
    main.appendChild(renderCharacterCard(character));
  });
});
