import { setupBasePage } from './basepage.js';
import { createCardSection, paragraph, strong } from './global.js';

const characters = [
  {
    name: "Sinco",
    description: "Teenage speedster protecting Tempo City by any means necessary.",
    firstAppearance: 1,
    lastAppearance: 42,
    powerLevel: "",
    birthday: "",
    funFacts: [],
    image: ""
  },
  {
    name: "TJ",
    description: "Best friend of Sinco; defends Boredom City.",
    firstAppearance: 3,
    lastAppearance: 40,
    powerLevel: "",
    birthday: "",
    funFacts: [],
    image: ""
  },
  {
    name: "Tirok",
    description: "Anti-hero engineer and scientist focused on his own ideals.",
    firstAppearance: 2,
    lastAppearance: 41,
    powerLevel: "",
    birthday: "",
    funFacts: [],
    image: ""
  },
  {
    name: "Osin",
    description: "Clone of Sinco made by Tirok, treats Tirok like a father figure.",
    firstAppearance: 5,
    lastAppearance: 42,
    powerLevel: "",
    birthday: "",
    funFacts: [],
    image: ""
  },
  {
    name: "Docaci",
    description: "Mother of Sinco, speedster who got her powers disabled by Tirok.",
    firstAppearance: 2,
    lastAppearance: 39,
    powerLevel: "",
    birthday: "",
    funFacts: [],
    image: ""
  },
  {
    name: "Karo",
    description: "Sinco's grandfather; the first person to turn super on Earth.",
    firstAppearance: 6,
    lastAppearance: 38,
    powerLevel: "",
    birthday: "",
    funFacts: [],
    image: ""
  }
];

function renderCharacterCard(character) {
  const content = `
    ${character.image ? `<img src="${character.image}" alt="${character.name}" class="character-image">` : ''}
    ${paragraph(character.description)}
    <ul>
      <li>${strong("First Appearance:")} Issue #${character.firstAppearance}</li>
      <li>${strong("Last Appearance:")} Issue #${character.lastAppearance}</li>
      ${character.powerLevel ? `<li>${strong("Power Level:")} ${character.powerLevel}</li>` : ''}
      ${character.birthday ? `<li>${strong("Birthday:")} ${character.birthday}</li>` : ''}
      ${character.funFacts.length ? `<li>${strong("Fun Facts:")}<ul>${character.funFacts.map(fact => `<li>${fact}</li>`).join('')}</ul></li>` : ''}
    </ul>
  `;

  return createCardSection(character.name, content);
}

function getCharactersContent() {
  return `
    <h1>${strong("Characters")}</h1>
    ${characters.map(renderCharacterCard).join('')}
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const main = setupBasePage("../");
  main.innerHTML = getCharactersContent();
});
