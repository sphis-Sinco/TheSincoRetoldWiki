const characters = [
  {
    name: "Sinco",
    description: "Teenage Speedster Hero of Tempo City",
    enra: [
      { value: 1080, context: "After training in the afterlife with Karo" }
    ]
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

    const enraBlock = document.createElement("div");
    const enraTitle = document.createElement("p");
    enraTitle.textContent = "Enra Readings:";

    if (Array.isArray(char.enra) && char.enra.length > 0) {
      enraBlock.appendChild(enraTitle);
      char.enra.forEach((reading) => {
        const readingText = document.createElement("p");
        readingText.textContent = `• ${reading.value} (${reading.context})`;
        enraBlock.appendChild(readingText);
      });
    } else {
      const noEnra = document.createElement("p");
      noEnra.textContent = "Enra Readings: Unknown";
      enraBlock.appendChild(noEnra);
    }

    const birthday = document.createElement("p");
    birthday.textContent = `Birthday: ${char.birthday ?? "Unknown"}`;

    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(enraBlock);
    card.appendChild(birthday);

    container.appendChild(card);
  });
});