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
    forms: ["Super", "Calm Super", "Super Grade 2", "Fury Form", "Hyper Form", "Hyper Remnant"]
  },
  {
    name: "TJ",
    description: "Teenage Speedster Hero of Boredom City",
    birthday: "2011-04-03",
    enra: [
      { value: 320, context: "After gaining powers" },
      { value: 10, context: "Before gaining powers" }
    ],
    forms: ["Calm Super"]
  },
  {
    name: "Tirok",
    description: "Anti-Hero engineer and scientist",
    birthday: "2000-04-05",
    enra: [
      { value: 1537, context: "After getting his wish for power" },
      { value: 1, context: "Since birth" }
    ],
    forms: []
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
    forms: ["Calm Super", "Hyper Form", "Hyper Rage Form"]
  },
  {
    name: "Crepode",
    description: "Famous creator of the Fuerza technique used by Sinco",
    enra: [
      { value: 453, context: "Since Sinco met him" }
    ],
    forms: []
  },
  {
    name: "Docaci",
    description: "Speedster mother of Sinco, got her powers drained by Tirok",
    birthday: "1993-03-14",
    enra: [
      { value: 287, context: "Before her powers were drained" },
      { value: 12, context: "After her powers were drained" }
    ],
    forms: ["Calm Super"]
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
    forms: ["Super"]
  }
];

// Form multipliers with descriptions
const allFormMultipliers = {
  "Super": {
    multiplier: 1.10,
    description: "An awakened state that boosts all stats slightly. Requires emotional spark."
  },
  "Calm Super": {
    multiplier: 1.05,
    description: "A relaxed, efficient version of Super that maintains control and stamina."
  },
  "Super Grade 2": {
    multiplier: 1.20,
    description: "A more refined Super form with better power output and stability."
  },
  "Fury Form": {
    multiplier: 1.40,
    description: "Power driven by rage, greatly enhancing speed and attack at the cost of control."
  },
  "Hyper Form": {
    multiplier: 1.70,
    description: "A high-level transformation with tremendous speed and aura output."
  },
  "Hyper Rage Form": {
    multiplier: 1.90,
    description: "An unstable, volatile form drawn from extreme fury and focus combined."
  },
  "Hyper Remnant": {
    multiplier: 1.50,
    description: "Residual Hyper energy left behind that can act independently for short bursts."
  }
};

// Find base Enra
function getFormBaseEnra(char) {
  return char.enra.find(e => e.formBaseEnra) || char.enra.reduce((a, b) => (a.value > b.value ? a : b), { value: 0 });
}

// Get calculated form powers
function getFormPowers(baseValue, allowedForms) {
  return allowedForms.map(formName => {
    const formData = allFormMultipliers[formName];
    if (!formData) return `${formName}: Unknown multiplier`;

    const power = (baseValue * formData.multiplier).toFixed(2);
    return `${formName} (${formData.multiplier}x): ${power} Enra — ${formData.description}`;
  });
}

// Render all character cards
function renderCharacters() {
  const container = document.getElementById("character-list");
  container.innerHTML = "";

  characters.forEach(char => {
    const card = document.createElement("div");
    card.className = "character-card";

    const nameElem = document.createElement("h3");
    nameElem.textContent = char.name;
    card.appendChild(nameElem);

    const desc = document.createElement("p");
    desc.textContent = char.description;
    card.appendChild(desc);

    if (char.birthday) {
      const bday = document.createElement("p");
      bday.textContent = `Birthday: ${char.birthday}`;
      card.appendChild(bday);
    }

    const baseEnra = getFormBaseEnra(char);
    const enraElem = document.createElement("p");
    enraElem.textContent = `Base Enra: ${baseEnra.value.toFixed(2)} — "${baseEnra.context}"`;
    card.appendChild(enraElem);

    if (char.forms && char.forms.length > 0) {
      const footnote = document.createElement("div");
      footnote.className = "form-footnote";

      const formTitle = document.createElement("p");
      formTitle.textContent = "Form Powers:";
      footnote.appendChild(formTitle);

      const formReadings = getFormPowers(baseEnra.value, char.forms);

      formReadings.forEach(text => {
        const p = document.createElement("p");
        p.textContent = "• " + text;
        footnote.appendChild(p);
      });

      card.appendChild(footnote);
    }

    container.appendChild(card);
  });
}

// Export to JSON
function generateExportJSON(includeForms = true) {
  const exportData = characters.map(char => {
    const base = getFormBaseEnra(char);
    const forms = {};

    if (includeForms && char.forms && char.forms.length > 0) {
      char.forms.forEach(formName => {
        const formData = allFormMultipliers[formName];
        if (formData) {
          forms[formName] = {
            enra: +(base.value * formData.multiplier).toFixed(2),
            multiplier: formData.multiplier,
            description: formData.description
          };
        }
      });
    }

    return {
      name: char.name,
      description: char.description,
      birthday: char.birthday || undefined,
      baseEnra: base.value,
      baseEnraContext: base.context,
      forms
    };
  });

  return JSON.stringify(exportData, null, 2);
}

// Setup on DOM load
document.addEventListener("DOMContentLoaded", () => {
  renderCharacters();

  const exportBtn = document.getElementById("export-json-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const json = generateExportJSON(true);
      console.log(json);
      alert("Exported JSON logged to console.");
    });
  }
});