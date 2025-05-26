// scripts/changelog.js

import { strong, span } from './global.js';

export const changelog = [
  {
    changenum: 0,
    date: "2025-05-26",
    text: "Initial homepage created for the official ",
    tag: { text: "Sinco Retold Wiki", class: "tag" },
    after: "."
  },
  {
    changenum: 1,
    date: "2025-05-26",
    text: "Made navbar elements spaced properly using CSS."
  },
  {
    changenum: 2,
    date: "2025-05-26",
    text: "Removed the 'Factions' tab from the navigation bar."
  },
  {
    changenum: 3,
    date: "2025-05-26",
    text: "Moved the featured article logic to a separate homepageContent module.",
    tag: { text: "Featured Article", class: "tag" },
    after: " section is now modular and can display a fallback message."
  },
  {
    changenum: 4,
    date: "2025-05-26",
    text: "Recent Updates section now loads dynamically from a JSON-like array.",
    tag: { text: "Changelog", class: "tag" },
    after: " entries are easier to add."
  },
  {
  changenum: 5,
  date: "2025-05-26",
  text: "Updated Contact link in footer to open Gmail compose for sinconsistencia@gmail.com email."
  }
];

/**
 * Returns an HTML string of the changelog as a list.
 */
export function renderChangelog() {
  return `<ul>
    ${changelog
      .slice()
      .reverse() // Show newest first
      .map(entry => {
        const tagHTML = entry.tag ? span(entry.tag.text, entry.tag.class) : "";
        return `<li>${strong(entry.date + ":")} ${entry.text}${tagHTML}${entry.after || ""}</li>`;
      })
      .join("\n")}
  </ul>`;
}
