import { strong, span } from './global.js';

let changenum = -1;
export const changelog = {};

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

export function addChanges(date, changes) {
  for (const change of changes) {
    addChange(date, change.text, change.tag || null, change.after || "");
  }
}

// === Actual site-impacting changes ===
addChanges("2025-05-26", [
  { text: "Created the initial homepage for the official ", tag: { text: "Sinco Retold Wiki", class: "tag" }, after: "." },
  { text: "Added spacing between navbar elements using CSS to improve layout." },
  { text: "Removed the 'Factions' tab from the navigation bar as it's not applicable." },
  { text: "Moved featured article logic into a dedicated homepageContent module with fallback message support." },
  { text: "Made the Recent Updates section load dynamically from a JSON array for easier updating." },
  { text: "Updated the Contact link in footer to open Gmail compose targeting sinconsistencia@gmail.com." },
  { text: "Implemented changelog entry grouping by date and improved rendering for better readability." },
  { text: "Added bulk changelog entry support via addChanges function for easier maintenance.", tag: { text: "Improvement", class: "tag" } }
]);

export function renderChangelog() {
  const dates = Object.keys(changelog).sort((a, b) => b.localeCompare(a));
  return dates.map(date => `
    <h3>${strong(date)}</h3>
    <ul>
      ${changelog[date]
        .sort((a, b) => b.changenum - a.changenum)
        .map(entry => {
          const tag = entry.tag ? span(entry.tag.text, entry.tag.class) : "";
          return `<li>• ${entry.text}${tag}${entry.after || ""}</li>`;
        }).join('\n')}
    </ul>
  `).join('\n');
}
