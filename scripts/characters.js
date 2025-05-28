import { characters, allFormMultipliers } from './charactersData.js';

// Function to get the base Enra reading for forms
function getFormBaseEnra(char) {
  const explicit = char.enra.find(e => e.formBaseEnra);
  if (explicit) return explicit;
  if (!char.enra || char.enra.length === 0) return { value: 0, context: "No Enra data available" };
  return char.enra.reduce((a, b) => (a.value > b.value ? a : b));
}

// Generate form powers based on base Enra and allowed forms
function getFormPowers(baseValue, allowedForms) {
  return allowedForms.map(formName => {
    const multiplier = allFormMultipliers[formName];
    if (!multiplier) return `${formName}: Unknown multiplier`;
    const power = (baseValue * multiplier).toFixed(2);
    return `${formName} (${multiplier}x): ${power} Enra`;
  });
}

// Render characters into the container
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
    card.innerHTML = `
      <h3>${char.name}</h3>
      <p>${char.description}</p>
      ${char.birthday ? `<p>Birthday: ${char.birthday}</p>` : ""}
      <div class="enra-section">
        <p><strong>All Enra Readings:</strong></p>
        ${char.enra.map(e => `<p>• ${e.value} — "${e.context}"</p>`).join("")}
      </div>
    `;

    // Form Variations only for the base Enra reading
    if (char.forms && char.forms.length && char.enra && char.enra.length) {
      const baseReading = getFormBaseEnra(char);
      const variationsHTML = getFormPowers(baseReading.value, char.forms)
        .map(line => `<p>→ ${line}</p>`)
        .join("");

      card.innerHTML += `
        <div class="form-footnote">
          <p><strong>Form Variations for Base Enra Reading:</strong></p>
          <p style="margin-top:0.5em; font-weight:bold;">
            <u>${baseReading.context} (${baseReading.value} Enra):</u>
          </p>
          ${variationsHTML}
        </div>
      `;
    }

    // Variations section if present
    if (char.variations && char.variations.length) {
      card.innerHTML += `
        <div class="variation-section">
          <p><strong>Variations:</strong></p>
          ${char.variations.map(v => `<p>• ${v}</p>`).join("")}
        </div>
      `;
    }

    container.appendChild(card);
  });
}

// Run render after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  renderCharacters();
});