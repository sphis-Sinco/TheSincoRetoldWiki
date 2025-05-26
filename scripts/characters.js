// characters.js

const characters = [
  { name: "Sinco", description: "", enra: 0, birthday: "" },
  { name: "TJ", description: "", enra: 0, birthday: "" },
  { name: "Tirok", description: "", enra: 0, birthday: "" },
  { name: "Osin", description: "", enra: 0, birthday: "" },
  { name: "Crepode", description: "", enra: 0, birthday: "" },
  { name: "Docaci", description: "", enra: 0, birthday: "" },
  { name: "Karo", description: "", enra: 0, birthday: "" }
];

function formatDate(dateString) {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  if (isNaN(date)) return "Unknown";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

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
    enraElem.innerHTML = `<strong>Enra Reading:</strong> ${char.enra > 0 ? char.enra : "Unknown"}`;

    const birthdayElem = document.createElement("p");
    birthdayElem.innerHTML = `<strong>Birthday:</strong> ${formatDate(char.birthday)}`;

    card.appendChild(nameElem);
    card.appendChild(descElem);
    card.appendChild(enraElem);
    card.appendChild(birthdayElem);

    characterList.appendChild(card);
  });
});