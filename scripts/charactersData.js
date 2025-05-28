// charactersData.js

export const characters = [
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

export const allFormMultipliers = {
  "Super": 1.10,
  "Calm Super": 1.05,
  "Super Grade 2": 1.20,
  "Fury Form": 1.40,
  "Hyper Form": 1.70,
  "Hyper Rage Form": 1.90,
  "Hyper Remnant": 1.50
};