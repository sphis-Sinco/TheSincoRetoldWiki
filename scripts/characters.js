// Character data
const characters = [
  { name: "Sinco", description: "" },
  { name: "TJ", description: "" },
  { name: "Tirok", description: "" },
  { name: "Osin", description: "" },
  { name: "Crepode", description: "" },
  { name: "Docaci", description: "" },
  { name: "Karo", description: "" }
];

// Render logic
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("character-list");

  if (!container) return;

  if (!characters || characters.length === 0) {
    container.innerHTML = "<p>No characters have been added yet.</p>";
    return;
  }

  characters.forEach(char => {
    const card = document.createElement("div");
    card.className = "character-card";

    const nameEl = document.createElement("h2");
    nameEl.textContent = char.name;

    const descEl = document.createElement("p");
    descEl.textContent = char.description || "No description available.";

    card.appendChild(nameEl);
    card.appendChild(descEl);
    container.appendChild(card);
  });
});