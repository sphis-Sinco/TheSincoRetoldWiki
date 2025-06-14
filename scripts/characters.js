import { characters, allFormMultipliers } from './charactersData.js';

const characterList = document.getElementById('character-list');
const downloadWithFormsBtn = document.getElementById('downloadWithForms');
const downloadWithoutFormsBtn = document.getElementById('downloadWithoutForms');

if (!characterList) {
  console.error('Error: #character-list element not found');
} 
if (!downloadWithFormsBtn || !downloadWithoutFormsBtn) {
  console.error('Error: One or both download buttons not found');
}

/**
 * Render Enra readings for a character.
 * @param {Array} enra Array of enra reading objects
 * @returns {HTMLElement}
 */
function renderEnra(enra) {
  const container = document.createElement('div');
  container.setAttribute('role', 'list');
  if (!enra || enra.length === 0) {
    const noDataMsg = document.createElement('p');
    noDataMsg.textContent = "No Enra readings available for this character.";
    container.appendChild(noDataMsg);
    return container;
  }
  enra.forEach(({ value, context, formBaseEnra }) => {
    const item = document.createElement('div');
    item.setAttribute('role', 'listitem');
    item.textContent = `${value} (Context: ${context}${formBaseEnra ? ", Base Form Enra" : ""})`;
    container.appendChild(item);
  });
  return container;
}

/**
 * Render forms and multipliers info with calculated Enra.
 * @param {Array} forms Array of form names
 * @param {number} baseEnra Base Enra value to multiply
 * @returns {HTMLElement}
 */
function renderForms(forms, baseEnra) {
  const container = document.createElement('div');
  container.setAttribute('aria-label', 'Character Forms and multipliers');
  if (!forms || forms.length === 0) {
    return container;
  }

  const info = document.createElement('p');
  info.textContent = "Form Enra calculations based on multipliers:";
  container.appendChild(info);

  const list = document.createElement('ul');
  forms.forEach(form => {
    const multiplier = allFormMultipliers[form];
    const listItem = document.createElement('li');
    if (typeof multiplier === 'number') {
      const calculatedEnra = (baseEnra * multiplier).toFixed(2);
      listItem.textContent = `${form}: ×${multiplier} = ${calculatedEnra} Enra`;
    } else {
      listItem.textContent = `${form}: Unknown multiplier`;
    }
    list.appendChild(listItem);
  });
  container.appendChild(list);
  return container;
}

/**
 * Creates and triggers download of JSON data.
 * Cleans up created elements after download.
 * @param {object} data Data to be downloaded
 * @param {string} filename Name of the file
 */
function downloadJSON(data, filename) {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Validates a character object to ensure required properties are present.
 * @param {object} character
 * @returns {boolean}
 */
function validateCharacter(character) {
  if (!character || typeof character !== 'object') return false;
  if (typeof character.name !== 'string') return false;
  if (!Array.isArray(character.enra)) return false;
  return true;
}

/**
 * Render all characters in the DOM.
 * Uses DocumentFragment for better performance.
 */
function renderCharacters() {
  if (!characterList) return;
  characterList.innerHTML = '';

  const fragment = document.createDocumentFragment();

  characters.forEach(character => {
    if (!validateCharacter(character)) {
      console.warn(`Invalid character data skipped: ${character?.name || '[Unnamed]'}`);
      return;
    }

    const charDiv = document.createElement('div');
    charDiv.classList.add('character-profile');
    charDiv.setAttribute('role', 'article');
    charDiv.setAttribute('aria-label', `Profile for ${character.name}`);

    const nameEl = document.createElement('h3');
    nameEl.textContent = character.name;
    charDiv.appendChild(nameEl);

    if (character.description) {
      const descEl = document.createElement('p');
      descEl.textContent = character.description;
      charDiv.appendChild(descEl);
    }

    const birthdayEl = document.createElement('p');
    birthdayEl.textContent = character.birthday ? `Birthday: ${character.birthday}` : 'Birthday unknown';
    charDiv.appendChild(birthdayEl);

    charDiv.appendChild(renderEnra(character.enra));

    if (character.enra.length > 0 && character.forms?.length > 0) {
      // Find base Enra reading: prefer one marked as formBaseEnra, else first
      const baseEnraReading = character.enra.find(e => e.formBaseEnra) || character.enra[0];
      const baseEnra = baseEnraReading ? baseEnraReading.value : 0;
      charDiv.appendChild(renderForms(character.forms, baseEnra));
    }

    if (character.variations?.length > 0) {
      const varSection = document.createElement('section');
      varSection.setAttribute('aria-label', `Variations of ${character.name}`);
      character.variations.forEach(variation => {
        varSection.appendChild(renderCharacterSummary(variation));
      });
      charDiv.appendChild(varSection);
    }

    fragment.appendChild(charDiv);
  });

  characterList.appendChild(fragment);
}

/**
 * Helper to render character summary for variations.
 * @param {object} character
 * @returns {HTMLElement}
 */
function renderCharacterSummary(character) {
  const div = document.createElement('div');
  div.classList.add('character-variation');
  div.setAttribute('role', 'article');
  div.setAttribute('aria-label', `Variation profile for ${character.name}`);

  const nameEl = document.createElement('h4');
  nameEl.textContent = character.name;
  div.appendChild(nameEl);

  if (character.description) {
    const descEl = document.createElement('p');
    descEl.textContent = character.description;
    div.appendChild(descEl);
  }

  div.appendChild(renderEnra(character.enra));

  if (character.enra.length > 0 && character.forms?.length > 0) {
    const baseEnraReading = character.enra.find(e => e.formBaseEnra) || character.enra[0];
    const baseEnra = baseEnraReading ? baseEnraReading.value : 0;
    div.appendChild(renderForms(character.forms, baseEnra));
  }

  return div;
}

if (downloadWithFormsBtn) {
  downloadWithFormsBtn.addEventListener('click', () => {
    downloadJSON(characters, 'characters_with_forms.json');
  });
}

if (downloadWithoutFormsBtn) {
  downloadWithoutFormsBtn.addEventListener('click', () => {
    const charsWithoutForms = characters.map(({ forms, ...rest }) => rest);
    downloadJSON(charsWithoutForms, 'characters_without_forms.json');
  });
}

renderCharacters();