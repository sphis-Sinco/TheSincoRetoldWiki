// Characters array with forms included inside each character object
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
    ],
    forms: ["Super", "Calm Super", "Super Grade 2", "Fury Form", "Hyper Form", "Hyper Remnant"],
    variations: []
  },
  {
    name: "TJ",
    description: "Teenage Speedster Hero of Boredom City",
    birthday: "2011-04-03",
    enra: [
      { value: 320, context: "After gaining powers" },
      { value: 10, context: "Before gaining powers" }
    ],
    forms: ["Calm Super"],
    variations: []
  },
  {
    name: "Tirok",
    description: "Anti-Hero engineer and scientist",
    birthday: "2000-04-05",
    enra: [
      { value: 1537, context: "After getting his wish for power" },
      { value: 1, context: "Since birth" }
    ],
    forms: [],
    variations: []
  },
  {
    name: "Osin",
    description: "A clone of Sinco made by Tirok",
    birthday: "2023-10-08",
    enra: [
      { value: 1257, context: "Rage Boost power during Titan-T arc (Volume 4)" },
      { value: 1020, context: "Resting power during Titan-T arc (Volume 4)", formBaseEnra: true },
      { value: 855, context: "During Squad 2 Invasion with a Rage boost" },
      { value: 630, context: "After Squad 2 Invasion is over" },
      { value: 570, context: "During Squad 2 Invasion" },
      { value: 313, context: "In creation" }
    ],
    forms: ["Calm Super", "Hyper Form", "Hyper Rage Form"],
    variations: []
  },
  {
    name: "Crepode",
    description: "Famous creator of the Fuerza technique used by Sinco",
    enra: [
      { value: 453, context: "Since Sinco met him" }
    ],
    forms: [],
    variations: []
  },
  {
    name: "Docaci",
    description: "Speedster mother of Sinco, got her powers drained by Tirok",
    birthday: "1993-03-14",
    enra: [
      { value: 287, context: "Before her powers were drained" },
      { value: 12, context: "After her powers were drained" }
    ],
    forms: ["Calm Super"],
    variations: []
  },
  {
    name: "Karo",
    description: "Speedster grandfather of Sinco, the reason Docaci and Sinco are speedsters, Karo is the first person to go super on earth",
    birthday: "1974-06-23",
    enra: [
      { value: 416, context: "After going super for the first time" },
      { value: 334, context: "After getting speedster powers", formBaseEnra: true },
      { value: 2, context: "Before getting speedster powers" }
    ],
    forms: ["Super"],
    variations: []
  }
];

// Form multipliers without descriptions for cleaner JSON
const allFormMultipliers = {
  "Super": 1.10,
  "Calm Super": 1.05,
  "Super Grade 2": 1.20,
  "Fury Form": 1.40,
  "Hyper Form": 1.70,
  "Hyper Rage Form": 1.90,
  "Hyper Remnant": 1.50
};

// Find base Enra (for future use, currently not used directly in rendering)
function getFormBaseEnra(char) {
  const explicit = char.enra.find(e => e.formBaseEnra);
  if (explicit) return explicit;
  if (!char.enra || char.enra.length === 0) return { value: 0, context: "No Enra data available" };
  // Return the max Enra reading by value
  return char.enra.reduce((a, b) => (a.value > b.value ? a : b));
}

// Calculate power values for each form based on base Enra value and allowed forms
function getFormPowers(baseValue, allowedForms) {
  return allowedForms.map(formName => {
    const multiplier = allFormMultipliers[formName];
    if (!multiplier) return `${formName}: Unknown multiplier`;

    const power = (baseValue * multiplier).toFixed(2);
    return `${formName} (${multiplier}x): ${power} Enra`;
  });
}

// Render all character cards into the container element with id "character-list"
function renderCharacters() {
  const container = document.getElementById("character-list");
  if (!container) {
    console.warn("Container with id 'character-list' not found.");
    return;
  }
  container.innerHTML = "";

  characters.forEach(char => {
    const card = document.createElement("div");
    card.className = "character-card";

    // Name & Description
    const nameElem = document.createElement("h3");
    nameElem.textContent = char.name;
    card.appendChild(nameElem);

    const desc = document.createElement("p");
    desc.textContent = char.description;
    card.appendChild(desc);

    // Birthday (if present)
    if (char.birthday) {
      const bday = document.createElement("p");
      bday.textContent = `Birthday: ${char.birthday}`;
      card.appendChild(bday);
    }

    // ENRA Readings Section
    if (char.enra && char.enra.length > 0) {
      const enraSection = document.createElement("div");
      enraSection.className = "enra-section";

      const enraHeader = document.createElement("p");
      enraHeader.innerHTML = `<strong>All Enra Readings:</strong>`;
      enraSection.appendChild(enraHeader);

      char.enra.forEach(reading => {
        const readingText = document.createElement("p");
        readingText.textContent = `• ${reading.value} — "${reading.context}"`;
        enraSection.appendChild(readingText);
      });

      card.appendChild(enraSection);
    }

    // FORM VARIATIONS Section (show calculated powers per form for each Enra reading)
    if (char.forms && char.forms.length > 0 && char.enra && char.enra.length > 0) {
      const formSection = document.createElement("div");
      formSection.className = "form-footnote";

      const formHeader = document.createElement("p");
      formHeader.innerHTML = `<strong>Form Variations for each Enra:</strong>`;
      formSection.appendChild(formHeader);

      char.enra.forEach(reading => {
        const label = document.createElement("p");
        label.style.marginTop = "0.5em";
        label.innerHTML = `<u>${reading.context} (${reading.value} Enra):</u>`;
        formSection.appendChild(label);

        const variationLines = getFormPowers(reading.value, char.forms);
        variationLines.forEach(line => {
          const p = document.createElement("p");
          p.textContent = "→ " + line;
          formSection.appendChild(p);
        });
      });

      card.appendChild(formSection);
    }

    // VARIATIONS Section
    if (char.variations && char.variations.length > 0) {
      const variationSection = document.createElement("div");
      variationSection.className = "variation-section";

      const variationHeader = document.createElement("p");
      variationHeader.innerHTML = `<strong>Variations:</strong>`;
      variationSection.appendChild(variationHeader);

      char.variations.forEach(variation => {
        const variationText = document.createElement("p");
        variationText.textContent = `• ${variation}`;
        variationSection.appendChild(variationText);
      });

      card.appendChild(variationSection);
    }

    container.appendChild(card);
  });
}

// Generate JSON export with options to include forms and variations
function generateExportJSON(includeForms = true, includeVariations = true) {
  return JSON.stringify(characters.map(character => {
    const result = {
      name: character.name,
      description: character.description,
      enra: character.enra,
    };
    if (includeForms) {
      result.forms = character.forms || [];
    }
    if (includeVariations) {
      result.variations = character.variations || [];
    }
    return result;
  }), null, 2);
}

// Download JSON helper function to trigger file download
function downloadJSON(data, filename) {
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// On DOM ready, render characters and attach button listeners
document.addEventListener("DOMContentLoaded", () => {
  renderCharacters();

  document.getElementById("downloadWithForms")?.addEventListener("click", () => {
    const json = generateExportJSON(true, true);  // include forms and variations
    downloadJSON(json, "characters_with_forms_and_variations.json");
  });

  document.getElementById("downloadWithoutForms")?.addEventListener("click", () => {
    const json = generateExportJSON(false, false);  // exclude forms and variations
    downloadJSON(json, "characters_basic.json");
  });
});