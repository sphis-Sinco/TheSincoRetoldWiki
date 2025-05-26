// scripts/index.js
import { setupBasePage } from './basepage.js';
import { paragraph, strong } from './global.js';

function getHomepageContent() {
  return `
    <h1>Welcome to The Sinco Retold Wiki</h1>
    ${paragraph(
      "This is the official encyclopedia maintained by the creator of",
      strong("Sinco Retold") + ".",
      "Whether you're new or returning, this archive helps you dive deeper into the mythos."
    )}
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const main = setupBasePage();
  main.innerHTML = getHomepageContent();
});
