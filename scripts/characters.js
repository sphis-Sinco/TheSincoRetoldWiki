// scripts/characters.js
import { setupBasePage } from './basepage.js';

const characters = [
  { name: "Slate", description: "The determined commander navigating the perils of Sinco Retold." },
  { name: "Echo", description: "A mysterious shapeshifter with unclear motives." },
  { name: "Vera", description: "A sharp technician who senses hidden threats." }
];

function renderCharacterCard(character) {
  return `
    <section class="character-card">
      <h2>${character.name}</h2>
      <p>${character.description}</p>
    </section>
  `;
}

function getCharactersContent() {
  return `
    <h1>Characters</h1>
    ${characters.map(renderCharacterCard).join('')}
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const main = setupBasePage();
  main.innerHTML = getCharactersContent();
});
