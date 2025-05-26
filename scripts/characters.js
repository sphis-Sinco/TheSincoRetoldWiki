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
    funFacts: ["Based off his creator heavily", "Died twice, both times getting some kind of special training"],
  },
  {
    name: "TJ",
    description: "Best-friend of Sinco, another teenager speedster, protecting Boredom City instead.",
    powerLevel: null,
    firstAppearance: 1,
    lastAppearance: 30,
    birthday: "2011-04-03",
    funFacts: [],
  },
  // ... other characters ...
];

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderCharacterCard(character) {
  const contentParts = [];

  contentParts.push(paragraph(character.description));

  contentParts.push('<ul>');

  contentParts.push(`<li>${strong('First Appearance:')} Issue #${character.firstAppearance}</li>`);
  contentParts.push(`<li>${strong('Last Appearance:')} Issue #${character.lastAppearance}</li>`);

  if (typeof character.powerLevel === 'number') {
    contentParts.push(`<li>${strong('Power Level:')} ${character.powerLevel}</li>`);
  }

  if (character.birthday) {
    contentParts.push(`<li>${strong('Birthday:')} ${formatDate(character.birthday)}</li>`);
  }

  if (character.funFacts && character.funFacts.length > 0) {
    contentParts.push('<li>');
    contentParts.push(strong('Fun Facts:'));
    contentParts.push('<details><summary>Click to expand</summary><ul>');
    character.funFacts.forEach(fact => contentParts.push(`<li>${fact}</li>`));
    contentParts.push('</ul></details>');
    contentParts.push('</li>');
  }

  contentParts.push('</ul>');

  const content = contentParts.join('');
  return createCardSection(character.name, content);
}

document.addEventListener('DOMContentLoaded', () => {
  const main = setupBasePage('../');

  main.appendChild(createElement('h1', {}, 'Characters'));

  characters.forEach(character => {
    main.appendChild(renderCharacterCard(character));
  });
});
