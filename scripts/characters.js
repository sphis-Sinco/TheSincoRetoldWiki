import { setupBasePage } from './basepage.js';
import { createCardSection, paragraph, strong } from './global.js';

const characters = [
  {
    name: "Sinco",
    description: "Teenager speedster protecting Tempo City by any means necessary.",
    powerLevel: 1080,
    firstAppearance: 1,
    lastAppearance: 85,
    birthday: "2011-09-19",
    funFacts: [
      "Based off his creator heavily",
      "Died twice, both times getting some kind of special training"
    ]
  },
  {
    name: "TJ",
    description: "Best-friend of Sinco, another teenager speedster, protecting Boredom City instead.",
    powerLevel: null,
    firstAppearance: 1,
    lastAppearance: 30,
    birthday: "",
    funFacts: []
  },
  // Add the rest of the characters here
];

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderCharacterCard(character) {
  const content = `
    ${paragraph(character.description)}
    <ul>
      <li>${strong("First Appearance:")} Issue #${character.firstAppearance}</li>
      <li>${strong("Last Appearance:")} Issue #${character.lastAppearance}</li>
      ${typeof character.powerLevel === 'number' ? `<li>${strong("Power Level:")} ${character.powerLevel}</li>` : ''}
      ${character.birthday ? `<li>${strong("Birthday:")} ${formatDate(character.birthday)}</li>` : ''}
      ${character.funFacts && character.funFacts.length ? `
        <li>
          ${strong("Fun Facts:")}
          <ul>${character.funFacts.map(fact => `<li>${fact}</li>`).join('')}</ul>
        </li>
      ` : ''}
    </ul>
  `;
  return createCardSection(character.name, content);
}

document.addEventListener("DOMContentLoaded", () => {
  const main = setupBasePage("../");
  characters.forEach(char => {
    main.appendChild(renderCharacterCard(char));
  });
});
