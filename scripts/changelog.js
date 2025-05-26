import { strong, span } from './global.js';

// Internal counter
let changenum = -1;

// Changelog storage
export const changelog = {};

// Function to add a single change
export function addChange(date, text, tag = null, after = "") {
  changenum++;
  const entry = { changenum, date, text };
  if (tag) entry.tag = tag;
  if (after) entry.after = after;

  if (!changelog[date]) {
    changelog[date] = [];
  }
  changelog[date].push(entry);
}

// Function to add multiple changes for the same date
export function addChanges(date, changes) {
  for (const change of changes) {
    addChange(date, change.text, change.tag || null, change.after || "");
  }
}

// === Changelog Entries ===
addChanges("2025-05-26", [
  { text: "Initial homepage created for the official ", tag: { text: "Sinco Retold Wiki", class: "tag" }, after: "." },
  { text: "Made navbar elements spaced properly using CSS." },
  { text: "Removed the 'Factions' tab from the navigation bar." },
  { text: "Moved the featured article logic to a separate homepageContent module.", tag: { text: "Featured Article", class: "tag" }, after: " section is now modular and can display a fallback message." },
  { text: "Recent Updates section now loads dynamically from a JSON-like array.", tag: { text: "Changelog", class: "tag" }, after: " entries are easier to add." },
  { text: "Updated Contact link in footer to open Gmail compose for sinconsistencia@gmail.com email." },
  { text: "Added support for bulk changelog entries via addChanges function.", tag: { text: "Improvement", class: "tag" } }
]);

// === Render function ===
export function renderChangelog() {
  const dates = Object.keys(changelog).sort((a, b) => b.localeCompare(a));
  return dates.map(date => `
    <h3>${date}</h3>
    <ul>
      ${changelog[date]
        .sort((a, b) => b.changenum - a.changenum)
        .map(entry => {
          const tag = entry.tag ? span(entry.tag.text, entry.tag.class) : "";
          return `<li>${strong("•")} ${entry.text}${tag}${entry.after || ""}</li>`;
        }).join('\n')}
    </ul>
  `).join('\n');
}
