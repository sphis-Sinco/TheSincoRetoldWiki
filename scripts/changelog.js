import { strong, span } from './global.js';

const changelog = [
  {
    date: "May 25",
    text: "Added new details to the ",
    tag: { text: "Sky Reavers", class: "tag" },
    after: " faction page."
  },
  {
    date: "May 20",
    text: "Timeline updated with entries from the Dawnfall Arc."
  },
  {
    date: "May 18",
    text: "New artwork added to the character profile of Lysira."
  }
];

export function renderChangelog() {
  return `<ul>
    ${changelog.map(entry => {
      const tag = entry.tag ? span(entry.tag.text, entry.tag.class) : "";
      return `<li>${strong(entry.date + ":")} ${entry.text}${tag}${entry.after || ""}</li>`;
    }).join('\n')}
  </ul>`;
}
