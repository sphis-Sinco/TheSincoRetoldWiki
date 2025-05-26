// characters.js

const characters = [
  { name: "Sinco", description: "", enra: "", birthday: "" },
  { name: "TJ", description: "", enra: "", birthday: "" },
  { name: "Tirok", description: "", enra: "", birthday: "" },
  { name: "Osin", description: "", enra: "", birthday: "" },
  { name: "Crepode", description: "", enra: "", birthday: "" },
  { name: "Docaci", description: "", enra: "", birthday: "" },
  { name: "Karo", description: "", enra: "", birthday: "" }
];

document.addEventListener("DOMContentLoaded", () => {
  const characterList = document.getElementById("character-list");
  characterList.innerHTML = ""; // Clear placeholder

  characters.forEach(char => {
    const card = document.createElement("li");
    card.classList.add("character-card");

    const nameElem = document.createElement("h2");
    nameElem.textContent = char.name;

    const descElem = document.createElement("p");
    descElem.textContent = char.description || "Description coming soon.";

    const enraElem = document.createElement("p");
    enraElem.innerHTML = `<strong>Enra Reading:</strong> ${char.enra || "Unknown"}`;

    const birthdayElem = document.createElement("p");
    birthdayElem.innerHTML = `<strong>Birthday:</strong> ${char.birthday || "Unknown"}`;

    card.appendChild(nameElem);
    card.appendChild(descElem);
    card.appendChild(enraElem);
    card.appendChild(birthdayElem);

    characterList.appendChild(card);
  });
});