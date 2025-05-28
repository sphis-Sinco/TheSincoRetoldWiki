import { characters, allFormMultipliers } from './charactersData.js';

const characterList = document.getElementById('character-list');
const downloadWithFormsBtn = document.getElementById('downloadWithForms');
const downloadWithoutFormsBtn = document.getElementById('downloadWithoutForms');

// Add explanation note to the page
const note = document.createElement('p');
note.textContent = 'Note: Form Enra calculations are based on predefined form multipliers.';
note.classList.add('form-note');
characterList.parentNode.insertBefore(note, characterList);

// Helper: Create Enra display section
function renderEnra(enraArray) {
  const container = document.createElement('ul');
  container.classList.add('enra-list');
  enraArray.forEach(({ value, context, formBaseEnra }) => {
    const item = document.createElement('li');
    item.textContent = `${value} - ${context}`;
    if (formBaseEnra) {
      item.textContent += ' (Form Base Enra)';
    }
    container.appendChild(item);
  });
  return container;
}

// Helper: Create Forms display with multiplier info
function renderForms(forms) {
  const container = document.createElement('ul');
  container.classList.add('form-list');
  forms.forEach((form) => {
    const item = document.createElement('li');
    const multiplier = allFormMultipliers[form];
    item.textContent = multiplier
      ? `${form} (x${multiplier.toFixed(2)} multiplier)`
      : form;
    container.appendChild(item);
  });
  return container;
}

// Helper: Create Download Button
function createDownloadButton(label, characterData) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(characterData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${characterData.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
  return btn;
}

// Render each character
characters.forEach((character) => {
  const card = document.createElement('div');
  card.classList.add('character-card');

  const name = document.createElement('h2');
  name.textContent = character.name;

  const desc = document.createElement('p');
  desc.textContent = character.description;

  const birthday = document.createElement('p');
  birthday.textContent = character.birthday
    ? `Born: ${character.birthday}`
    : 'Birthday: Unknown';

  const enraHeader = document.createElement('h3');
  enraHeader.textContent = 'Enra Readings';

  card.appendChild(name);
  card.appendChild(desc);
  card.appendChild(birthday);
  card.appendChild(enraHeader);

  if (character.enra.length > 0) {
    card.appendChild(renderEnra(character.enra));

    if (character.forms?.length) {
      const formsHeader = document.createElement('h3');
      formsHeader.textContent = 'Forms';
      card.appendChild(formsHeader);
      card.appendChild(renderForms(character.forms));
    }
  } else {
    const noEnraMsg = document.createElement('p');
    noEnraMsg.textContent = 'No Enra readings available for this character.';
    card.appendChild(noEnraMsg);
  }

  // Add variations (if any)
  if (character.variations?.length) {
    const variationsHeader = document.createElement('h3');
    variationsHeader.textContent = 'Variations';
    card.appendChild(variationsHeader);
    character.variations.forEach(variation => {
      const subCard = document.createElement('div');
      subCard.classList.add('variation-card');
      const subTitle = document.createElement('h4');
      subTitle.textContent = variation.name;
      const subDesc = document.createElement('p');
      subDesc.textContent = variation.description;
      subCard.appendChild(subTitle);
      subCard.appendChild(subDesc);
      if (variation.enra.length > 0) {
        subCard.appendChild(renderEnra(variation.enra));
        if (variation.forms?.length) {
          subCard.appendChild(renderForms(variation.forms));
        }
      } else {
        const noSubEnra = document.createElement('p');
        noSubEnra.textContent = 'No Enra readings available for this variation.';
        subCard.appendChild(noSubEnra);
      }
      card.appendChild(subCard);
    });
  }

  // Add download button
  const downloadBtn = createDownloadButton('Download Character JSON', character);
  card.appendChild(downloadBtn);

  characterList.appendChild(card);
});

// Page-wide Download Buttons
downloadWithFormsBtn.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(characters, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'characters_with_forms.json';
  a.click();
  URL.revokeObjectURL(url);
});

downloadWithoutFormsBtn.addEventListener('click', () => {
  const stripped = characters.map(({ forms, ...rest }) => rest);
  const blob = new Blob([JSON.stringify(stripped, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'characters_without_forms.json';
  a.click();
  URL.revokeObjectURL(url);
});