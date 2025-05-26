import { strong, span } from './global.js';

const changelogData = [
  {
    date: "May 25",
    description: `Added new details to the `,
    highlight: { text: "Sky Reavers", class: "tag" },
    suffix: " faction page."
  },
  {
    date: "May 20",
    description: "Timeline updated with entries from the Dawnfall Arc."
  },
  {
    date: "May 18",
    description: "New artwork added to the character profile of Lysira."
  }
];

export function renderChangelog() {
  return `<ul>
    ${changelogData.map(entry => {
      const highlight = entry.highlight ? span(entry.highlight.text, entry.highlight.class) : "";
      return `<li>${strong(entry.date + ":")} ${entry.description}${highlight}${entry.suffix || ""}</li>`;
    }).join('\n')}
  </ul>`;
}
