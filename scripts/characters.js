// characters.js

const characters = [
  {
    name: "Sinco",
    description: "Teenage Speedster Hero of Tempo City"
  },
  {
    name: "TJ",
    description: "Teenage Speedster Hero of Boredom City"
  },
  {
    name: "Tirok",
    description: "Anti-Hero engineer and scientist"
  },
  {
    name: "Osin",
    description: "A clone of Sinco made by Tirok"
  },
  {
    name: "Crepode",
    description: "Famous creator of the Fuerza technique used by Sinco"
  },
  {
    name: "Docaci",
    description: "Speedster mother of Sinco, got her powers drained by Tirok"
  },
  {
    name: "Karo",
    description: "Speedster grandfather of Sinco, the reason Docaci and Sinco are speedsters, Karo is the first person to go super on earth"
  }
];

// Render character cards
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("character-list");
  container.innerHTML = "";

  characters.forEach((char) => {
    const card = document.createElement("li");
    card.className = "character-card";

    const name = document.createElement("h2");
    name.textContent = char.name;

    const description = document.createElement("p");
    description.textContent = char.description;

    const enra = document.createElement("p");
    enra.textContent = `Enra Reading: ${char.enra ?? "Unknown"}`;

    const birthday = document.createElement("p");
    birthday.textContent = `Birthday: ${char.birthday ?? "Unknown"}`;

    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(enra);
    card.appendChild(birthday);

    container.appendChild(card);
  });
});