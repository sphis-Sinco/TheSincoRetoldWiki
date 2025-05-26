// scripts/index.js
import { setupBasePage } from './basepage.js';

function getHomepageContent() {
  return `
    <h1>Welcome to The Sinco Retold Wiki</h1>
    <p>This is the official encyclopedia maintained by the creator of <strong>Sinco Retold</strong>. Whether you're new or returning, this archive helps you dive deeper into the mythos.</p>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const main = setupBasePage();
  main.innerHTML = getHomepageContent();
});
