import { setupBasePage } from './basepage.js';
import { createCardSection, paragraph, strong, createElement } from './global.js';

const characters = [
  {
    name: "Sinco",
    description: "Teenager speedster protecting Tempo City by any means necessary.",
    powerLevel: 1080,
    image: "content/characters/sinco.png",
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
    image: "content/characters/tj.png",
    firstAppearance: 1,
    lastAppearance: 30,
    birthday: "",
    funFacts: []
  },
  {
    name: "Tirok",
    description: "Anti-Hero engineer scientist focused on his own beliefs.",
    powerLevel: 1,
    image: "content/characters/tirok.png",
    firstAppearance: 1,
    lastAppearance: 85,
    birthday: "2000-04-05",
    funFacts: ["Wishes for his own power"]
  },
  {
    name: "Osin",
    description: "Clone of Sinco made by Tirok, treats Tirok like a father figure.",
    powerLevel: 1020,
    image: "content/characters/osin.png",
    firstAppearance: 1,
    lastAppearance: 85,
    birthday: "2023-10-08",
    funFacts: []
  },
  {
    name: "Docaci",
    description: "Mother of Sinco, speedster who got her powers disabled by Tirok.",
    powerLevel: null,
    image: "content/characters/docaci.png",
    firstAppearance: 24,
    lastAppearance: 55,
    birthday: "1993-03-14",
    funFacts: []
  },
  {
    name: "Karo",
    description: "Sinco's grandfather, speedster, the first person to turn super on Earth, and the reason Docaci and Sinco have speedster powers now.",
    powerLevel: null,
    image: "content/characters/karo.png",
    firstAppearance: 47,
    lastAppearance: 61,
    birthday: "1974-06-23",
    funFacts: [
      "Made for a prequel book that tells the story of the first person to go super"
    ]
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
      ${character.funFacts && character.funFacts.length ? `
        <li>
          ${strong("Fun Facts:")}
          <details>
            <summary>Click to expand</summary>
            <ul>${character.funFacts.map(fact => `<li>${fact}</li>`).join('')}</ul>
          </details>
        </li>
      ` : ''}
    </ul>
  `;
  return createCardSection(character.name, content);
}

document.addEventListener("DOMContentLoaded", () => {
  const main = setupBasePage("../");

  const heading = createElement("h1", {}, "Characters");
  const characterContainer = createElement("div", { class: "character-container" });
  characters.forEach(character => {
    characterContainer.innerHTML += renderCharacterCard(character);
  });

  main.appendChild(heading);
  main.appendChild(characterContainer);
});
