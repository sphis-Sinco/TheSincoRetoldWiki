import { setupBasePage } from './basepage.js';
import { createCardSection, paragraph, strong } from './global.js';

const characters = [
  {
    name: "Sinco",
    description: "Teenager speedster protecting Tempo City by any means necessary.",
    powerLevel: null,
    image: "content/characters/sinco.jpg",
    firstAppearance: 1,
    lastAppearance: 10,
    birthday: "", // add in YYYY-MM-DD format if known
    funFacts: [
      "Fastest in Tempo City.",
      "Never gives up."
    ]
  },
  {
    name: "TJ",
    description: "Best-friend of Sinco, another teenager speedster, protecting Boredom City instead.",
    powerLevel: null,
    image: "content/characters/tj.jpg",
    firstAppearance: 1,
    lastAppearance: 9,
    birthday: "",
    funFacts: []
  },
  {
    name: "Tirok",
    description: "Anti-Hero engineer scientist focused on his own beliefs.",
    powerLevel: null,
    image: "content/characters/tirok.jpg",
    firstAppearance: 2,
    lastAppearance: 11,
    birthday: "",
    funFacts: ["Created Sinco’s clone."]
  },
  {
    name: "Osin",
    description: "Clone of Sinco made by Tirok, treats Tirok like a father figure.",
    powerLevel: null,
    image: "content/characters/osin.jpg",
    firstAppearance: 3,
    lastAppearance: 11,
    birthday: "",
    funFacts: []
  },
  {
    name: "Docaci",
    description: "Mother of Sinco, speedster who got her powers disabled by Tirok.",
    powerLevel: null,
    image: "content/characters/docaci.jpg",
    firstAppearance: 1,
    lastAppearance: 8,
    birthday: "",
    funFacts: []
  },
  {
    name: "Karo",
    description: "Sinco's grandfather, speedster, the first person to turn super on Earth, and the reason Docaci and Sinco have speedster powers now.",
    powerLevel: null,
    image: "content/characters/karo.jpg",
    firstAppearance: 0,
    lastAppearance: 5,
    birthday: "",
    funFacts: []
  }
];

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderCharacterCard(character) {
  const content = `
    ${character.image ? `<img src="${character.image}" alt="${character.name}" class="character-image">` : ''}
    ${paragraph(character.description)}
    <ul>
      <li>${strong("First Appearance:")} Issue #${character.firstAppearance}</li>
      <li>${strong("Last Appearance:")} Issue #${character.lastAppearance}</li>
      ${typeof character.powerLevel === 'number' ? `<li>${strong("Power Level:")} ${character.powerLevel}</li>` : ''}
      ${character.birthday ? `<li>${strong("Birthday:")} ${formatDate(character.birthday)}</li>` : ''}
      ${character.funFacts && character.funFacts.length ? `<li>${strong("Fun Facts:")}<ul>${character.funFacts.map(fact => `<li>${fact}</li>`).join('')}</ul></li>` : ''}
    </ul>
  `;

  return createCardSection(character.name, content);
}

function getCharactersContent() {
  return `
    <h1>Characters</h1>
    ${characters.map(renderCharacterCard).join('')}
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const main = setupBasePage("../");
  main.innerHTML = getCharactersContent();
});
