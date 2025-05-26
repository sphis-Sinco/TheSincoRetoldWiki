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

      const sortedReadings = char.enra.sort((a, b) => b.value - a.value);
      sortedReadings.forEach((reading) => {
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

function applyFilters() {
  const nameFilter = document.getElementById("nameFilter").value.toLowerCase();
  const minEnra = parseInt(document.getElementById("minEnraFilter").value);
  const bdayAfter = document.getElementById("birthdayAfterFilter").value;
  const bdayBefore = document.getElementById("birthdayBeforeFilter").value;

  const container = document.getElementById("character-list");
  container.innerHTML = "";

  characters.forEach((char) => {
    const matchesName = char.name.toLowerCase().includes(nameFilter);

    const maxEnra = (char.enra && char.enra.length)
      ? Math.max(...char.enra.map(r => r.value))
      : null;
    const matchesEnra = isNaN(minEnra) || (maxEnra !== null && maxEnra >= minEnra);

    const charBirthday = char.birthday ?? null;
    const matchesBirthdayAfter = !bdayAfter || (charBirthday && charBirthday >= bdayAfter);
    const matchesBirthdayBefore = !bdayBefore || (charBirthday && charBirthday <= bdayBefore);

    if (matchesName && matchesEnra && matchesBirthdayAfter && matchesBirthdayBefore) {
      container.appendChild(createCharacterCard(char));
    }
  });
}

function resetFilters() {
  document.getElementById("nameFilter").value = "";
  document.getElementById("minEnraFilter").value = "";
  document.getElementById("birthdayAfterFilter").value = "";
  document.getElementById("birthdayBeforeFilter").value = "";
  applyFilters();
}

function createCharacterCard(char) {
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

    const sortedReadings = char.enra.sort((a, b) => b.value - a.value);
    sortedReadings.forEach((reading) => {
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

  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  applyFilters();
});