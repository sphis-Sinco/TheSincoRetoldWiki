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
      { value: 1020, context: "Resting power during Titan-T arc (Volume 4)", formBaseEnra: true },
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
      { value: 334, context: "After getting speedster powers", formBaseEnra: true },
      { value: 2, context: "Before getting speedster powers" }
    ]
  }
];

// Form multipliers as constants
const allFormMultipliers = {
  "Super": 1.10,
  "Calm Super": 1.05,
  "Super Grade 2": 1.20,
  "Fury Form": 1.40,
  "Hyper Form": 1.70,
  "Hyper Rage Form": 1.90,
  "Hyper Remnant": 1.50
};

// Characters that have forms and their allowed forms
const characterForms = {
  "Sinco": ["Super", "Calm Super", "Super Grade 2", "Fury Form", "Hyper Form", "Hyper Remnant"],
  "TJ": ["Calm Super"],
  "Osin": ["Calm Super", "Hyper Form", "Hyper Rage Form"],
  "Docaci": ["Calm Super"],
  "Karo": ["Super"]
};

// Helper to get highest enra reading and the one marked as formBaseEnra if any
function getFormBaseEnra(char) {
  if (!char.enra || char.enra.length === 0) return null;
  // Look for formBaseEnra true first
  const base = char.enra.find(e => e.formBaseEnra === true);
  if (base) return base;
  // Otherwise return highest value
  return char.enra.reduce((max, e) => e.value > max.value ? e : max, char.enra[0]);
}

// Generate form power readings with multiplier text
function getFormPowers(baseValue, forms) {
  return forms.map(form => {
    const multiplier = allFormMultipliers[form];
    if (!multiplier) return null;
    const power = Math.round(baseValue * multiplier);
    return `${form}: ${power} (x${multiplier})`;
  }).filter(Boolean);
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
      // Sort descending by value without mutating original array
      const sortedReadings = [...char.enra].sort((a, b) => b.value - a.value);
      sortedReadings.forEach((reading) => {
        const readingText = document.createElement("p");
        readingText.textContent = `• ${reading.value} (${reading.context})`;
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

    // Add form footnotes if character has forms
    if (characterForms[char.name]) {
      const baseEnra = getFormBaseEnra(char);
      if (baseEnra) {
        const footnote = document.createElement("div");
        footnote.className = "form-footnote";

        const formTitle = document.createElement("p");
        formTitle.textContent = `Form powers (based on ${baseEnra.value} Enra — "${baseEnra.context}"):`;
        footnote.appendChild(formTitle);

        // Filter allowed forms, removing excluded forms per character rules
        const allowedForms = characterForms[char.name];

        // Calculate form powers with multipliers and include multiplier in parentheses
        const formReadings = getFormPowers(baseEnra.value, allowedForms);

        formReadings.forEach(text => {
          const p = document.createElement("p");
          p.textContent = "• " + text;
          footnote.appendChild(p);
        });

        card.appendChild(footnote);
      }
    }

    card.appendChild(birthday);

    container.appendChild(card);
  });
}

// Filter logic for the character list
function applyFilters() {
  const nameQuery = document.getElementById("nameFilter").value.trim().toLowerCase();
  const minEnraInput = document.getElementById("minEnraFilter").value.trim();
  const minEnra = minEnraInput === "" ? 0 : parseInt(minEnraInput, 10);
  const bornAfterInput = document.getElementById("birthdayAfterFilter").value;
  const bornBeforeInput = document.getElementById("birthdayBeforeFilter").value;
  const bornAfter = bornAfterInput ? new Date(bornAfterInput) : null;
  const bornBefore = bornBeforeInput ? new Date(bornBeforeInput) : null;

  const filtered = characters.filter((char) => {
    // Check name
    if (nameQuery && !char.name.toLowerCase().includes(nameQuery)) return false;

    // Check min Enra reading (highest value)
    const enraValues = char.enra?.map(r => r.value) || [];
    const highestEnra = enraValues.length > 0 ? Math.max(...enraValues) : 0;
    if (highestEnra < minEnra) return false;

    // Check birthday after
    if (bornAfter && char.birthday) {
      const bday = new Date(char.birthday);
      if (bday < bornAfter) return false;
    } else if (bornAfter && !char.birthday) {
      // If no birthday info but filtering by date, exclude
      return false;
    }

    // Check birthday before
    if (bornBefore && char.birthday) {
      const bday = new Date(char.birthday);
      if (bday > bornBefore) return false;
    } else if (bornBefore && !char.birthday) {
      return false;
    }

    return true;
  });

  renderCharacters(filtered);
}

// Reset filters to defaults and show all characters
function resetFilters() {
  document.getElementById("nameFilter").value = "";
  document.getElementById("minEnraFilter").value = "";
  document.getElementById("birthdayAfterFilter").value = "";
  document.getElementById("birthdayBeforeFilter").value = "";

  renderCharacters(characters);
}

// Initialize rendering and event listeners on page load
document.addEventListener("DOMContentLoaded", () => {
  renderCharacters(characters);

  document.getElementById("applyFiltersBtn").addEventListener("click", applyFilters);
  document.getElementById("resetFiltersBtn").addEventListener("click", resetFilters);
});

function generateExportJSON(includeForms = true) {
  const enrichedCharacters = characters.map(char => {
    const baseEnraEntry = char.enra?.find(e => e.formBaseEnra === true);
    const baseEnra = baseEnraEntry ? baseEnraEntry.value : null;

    let forms = {};
    if (includeForms && baseEnra && characterForms[char.name]) {
      characterForms[char.name].forEach(formName => {
        const multiplier = allFormMultipliers[formName];
        if (multiplier) {
          forms[formName] = {
            enra: +(baseEnra * multiplier).toFixed(2),
            multiplier
          };
        }
      });
    }

    return {
      ...char,
      ...(includeForms && Object.keys(forms).length > 0 ? { forms } : {})
    };
  });

  const blob = new Blob([JSON.stringify(enrichedCharacters, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;

  // Different filename depending on includeForms
  link.download = includeForms ? "characters-with-forms.json" : "characters.json";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}