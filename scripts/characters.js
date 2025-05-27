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
      { value: 1020, context: "Resting power during Titan-T arc (Volume 4)" },
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
      { value: 334, context: "After getting speedster powers" },
      { value: 2, context: "Before getting speedster powers" }
    ]
  }
];

// Form multipliers
const FORM_MULTIPLIERS = {
  "Super": 1.1,
  "Calm Super": 1.05,
  "Super Grade 2": 1.2,
  "Fury Form": 1.4,
  "Hyper Form": 1.7,
  "Hyper Rage": 1.9,
  "Hyper Remnant": 1.5
};

// Form availability
const FORM_SETS = {
  "Sinco": ["Super", "Calm Super", "Super Grade 2", "Fury Form", "Hyper Form"],
  "TJ": ["Calm Super"],
  "Osin": ["Fury Form", "Hyper Form"],
  "Docaci": ["Calm Super"],
  "Karo": ["Super"]
};

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

    let highestEnra = 0;

    if (Array.isArray(char.enra) && char.enra.length > 0) {
      const sortedReadings = [...char.enra].sort((a, b) => b.value - a.value);
      highestEnra = sortedReadings[0].value;
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

    // Transformation info for applicable characters
    if (FORM_SETS[char.name]) {
      const formBlock = document.createElement("div");
      formBlock.style.marginTop = "8px";

      const note = document.createElement("p");
      note.textContent = `Form multipliers based on highest Enra (${highestEnra}):`;
      formBlock.appendChild(note);

      FORM_SETS[char.name].forEach(formName => {
        const power = Math.round(highestEnra * FORM_MULTIPLIERS[formName]);
        const formLine = document.createElement("p");
        formLine.textContent = `• ${formName}: ${power}`;
        formBlock.appendChild(formLine);
      });

      enraBlock.appendChild(formBlock);
    }

    const birthday = document.createElement("p");
    birthday.textContent = `Birthday: ${char.birthday || "Unknown"}`;

    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(enraBlock);
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
    if (nameQuery && !char.name.toLowerCase().includes(nameQuery)) return false;

    const enraValues = char.enra?.map(r => r.value) || [];
    const highestEnra = enraValues.length > 0 ? Math.max(...enraValues) : 0;
    if (highestEnra < minEnra) return false;

    if (bornAfter && char.birthday) {
      const bday = new Date(char.birthday);
      if (bday < bornAfter) return false;
    } else if (bornAfter && !char.birthday) {
      return false;
    }

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

document.addEventListener("DOMContentLoaded", () => {
  renderCharacters(characters);
  document.getElementById("applyFiltersBtn").addEventListener("click", applyFilters);
  document.getElementById("resetFiltersBtn").addEventListener("click", resetFilters);
});