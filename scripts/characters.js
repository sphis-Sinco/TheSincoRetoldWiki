const characters = [
  {
    name: "Sinco",
    description: "Teenage Speedster Hero of Tempo City",
    birthday: "2011-09-19",
    enra: [
      { value: 1080, context: "After training in the afterlife with Karo" },
      { value: 487, context: "Before afterlife training" },
      { value: 380, context: "After training with Crepode for the first time" },
      { value: 295, context: "Before training with Crepode for the first time" }
    ]
  },
  {
    name: "TJ",
    description: "Teenage Speedster Hero of Boredom City",
    birthday: "2011-04-03",
    enra: [
      { value: 320, context: "After gaining powers" },
      { value: 10, context: "Before gaining powers" }
    ]
  },
  {
    name: "Tirok",
    description: "Anti-Hero engineer and scientist",
    birthday: "2000-04-05",
    enra: [
      { value: 1537, context: "After getting his wish for power" },
      { value: 1, context: "Since birth" }
    ]
  },
  {
    name: "Osin",
    description: "A clone of Sinco made by Tirok",
    birthday: "2023-10-08",
    enra: [
      { value: 1257, context: "Rage Boost power during Titan-T arc (Volume 4)" },
      { value: 1020, context: "Resting power during Titan-T arc (Volume 4)", formBase: true },
      { value: 855, context: "During Squad 2 Invasion with a Rage boost" },
      { value: 630, context: "After Squad 2 Invasion is over" },
      { value: 570, context: "During Squad 2 Invasion" },
      { value: 313, context: "In creation" }
    ]
  },
  {
    name: "Crepode",
    description: "Famous creator of the Fuerza technique used by Sinco",
    enra: [
      { value: 453, context: "Since Sinco met him" }
    ]
  },
  {
    name: "Docaci",
    description: "Speedster mother of Sinco, got her powers drained by Tirok",
    birthday: "1993-03-14",
    enra: [
      { value: 287, context: "Before her powers were drained" },
      { value: 12, context: "After her powers were drained" }
    ]
  },
  {
    name: "Karo",
    description: "Speedster grandfather of Sinco, the reason Docaci and Sinco are speedsters, Karo is the first person to go super on earth",
    birthday: "1974-06-23",
    enra: [
      { value: 416, context: "After going super for the first time" },
      { value: 334, context: "After getting speedster powers", formBase: true },
      { value: 2, context: "Before getting speedster powers" }
    ]
  }
];

// Form multipliers and applicable forms for each character
const formMultipliers = {
  "Super": 1.10,
  "Calm Super": 1.05,
  "Super Grade 2": 1.20,
  "Fury Form": 1.40,
  "Hyper Form": 1.70,
  "Hyper Rage Form": 1.90,
  "Hyper Remnant": 1.50
};

const characterForms = {
  Sinco: ["Super", "Calm Super", "Super Grade 2", "Fury Form", "Hyper Form", "Hyper Remnant"],
  TJ: ["Calm Super"],
  Osin: ["Rage Form", "Hyper Form"], // Rage Form is presumably Fury form, exclude some forms per your instructions
  Docaci: ["Calm Super"],
  Karo: ["Super"]
};

// Helper: get form base Enra value using formBase flag or highest value fallback
function getFormBaseEnra(char) {
  const baseEntry = char.enra?.find(e => e.formBase);
  if (baseEntry) return baseEntry.value;
  // fallback highest Enra value
  return Math.max(...(char.enra?.map(e => e.value) || [0]));
}

// Generate form power strings for a character
function getFormPowers(baseValue, forms) {
  return forms.map(form => {
    const multiplier = formMultipliers[form] || 1;
    const power = Math.round(baseValue * multiplier);
    return `${form}: ${power}`;
  });
}

// Render characters into the page
function renderCharacters(list) {
  const container = document.getElementById("character-list");
  container.innerHTML = "";

  list.forEach((char) => {
    const card = document.createElement("li");
    card.className = "character-card";

    const name = document.createElement("h2");
    name.textContent = char.name;

    const description = document.createElement("p");
    description.textContent = char.description;

    const enraBlock = document.createElement("div");
    const enraTitle = document.createElement("p");
    enraTitle.textContent = "Enra Readings:";
    enraBlock.appendChild(enraTitle);

    if (Array.isArray(char.enra) && char.enra.length > 0) {
      const sortedReadings = [...char.enra].sort((a, b) => b.value - a.value);
      sortedReadings.forEach((reading) => {
        const readingText = document.createElement("p");
        readingText.textContent = `• ${reading.value} (${reading.context})${reading.formBase ? " [Form Base]" : ""}`;
        enraBlock.appendChild(readingText);
      });
    } else {
      const noEnra = document.createElement("p");
      noEnra.textContent = "Unknown";
      enraBlock.appendChild(noEnra);
    }

    const birthday = document.createElement("p");
    birthday.textContent = `Birthday: ${char.birthday || "Unknown"}`;

    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(enraBlock);

    // Add form multipliers if character has forms
    if (characterForms[char.name]) {
      const baseValue = getFormBaseEnra(char);
      const formList = getFormPowers(baseValue, characterForms[char.name]);

      const formTitle = document.createElement("p");
      formTitle.textContent = `Forms (based on Enra reading ${baseValue}):`;
      card.appendChild(formTitle);

      formList.forEach((formStr) => {
        const formItem = document.createElement("p");
        formItem.textContent = `• ${formStr}`;
        card.appendChild(formItem);
      });
    }

    container.appendChild(card);
  });
}

// Filter logic and other functions unchanged...

// Initialize rendering and event listeners on page load
document.addEventListener("DOMContentLoaded", () => {
  renderCharacters(characters);

  document.getElementById("applyFiltersBtn").addEventListener("click", applyFilters);
  document.getElementById("resetFiltersBtn").addEventListener("click", resetFilters);
});