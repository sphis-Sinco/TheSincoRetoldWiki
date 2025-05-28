// Form multipliers map stays as-is for easy updating
export const allFormMultipliers = {
  "Super": 1.10,
  "Calm Super": 1.05,
  "Super Grade 2": 1.20,
  "Fury Form": 1.40,
  "Hyper Form": 1.70,
  "Hyper Rage Form": 1.90,
  "Hyper Remnant": 1.50
};

/**
 * Helper: generate enra readings array
 * 
 * @param {Array} readings Array of tuples [value, context, isBase?]
 * @returns {Array} enra objects
 */
function generateEnra(readings) {
  return readings.map(([value, context, formBaseEnra = false]) => ({
    value,
    context,
    ...(formBaseEnra ? { formBaseEnra: true } : {})
  }));
}

/**
 * Helper: create character profile object easily
 * 
 * @param {string} name
 * @param {string} description
 * @param {string} birthday  - YYYY-MM-DD
 * @param {Array} enraReadings - array of tuples [value, context, formBaseEnra?]
 * @param {Array} forms - array of form names (strings)
 * @param {Array} variations - array of variations (optional)
 * @returns {object} character profile
 */
export function createCharacter(name, description, birthday, enraReadings, forms = [], variations = []) {
  return {
    name,
    description,
    birthday,
    enra: generateEnra(enraReadings),
    forms,
    variations
  };
}

// Now export the characters array with simple calls
export const characters = [
  createCharacter(
    "Sinco",
    "Teenage Speedster Hero of Tempo City",
    "2011-09-19",
    [
      [1080, "After training in the afterlife with Karo"],
      [487, "Before afterlife training"],
      [380, "After training with Crepode for the first time"],
      [295, "Before training with Crepode for the first time"]
    ],
    ["Super", "Calm Super", "Super Grade 2", "Fury Form", "Hyper Form", "Hyper Remnant"]
  ),

  createCharacter(
    "TJ",
    "Teenage Speedster Hero of Boredom City",
    "2011-04-03",
    [
      [320, "After gaining powers"],
      [10, "Before gaining powers"]
    ],
    ["Calm Super"]
  ),

  createCharacter(
    "Tirok",
    "Anti-Hero engineer and scientist",
    "2000-04-05",
    [
      [1537, "After getting his wish for power"],
      [1, "Since birth"]
    ]
  ),

  createCharacter(
    "Osin",
    "A clone of Sinco made by Tirok",
    "2023-10-08",
    [
      [1257, "Rage Boost power during Titan-T arc (Volume 4)"],
      [1020, "Resting power during Titan-T arc (Volume 4)", true],
      [855, "During Squad 2 Invasion with a Rage boost"],
      [630, "After Squad 2 Invasion is over"],
      [570, "During Squad 2 Invasion"],
      [313, "In creation"]
    ],
    ["Calm Super", "Hyper Form", "Hyper Rage Form"]
  ),

  createCharacter(
    "Crepode",
    "Famous creator of the Fuerza technique used by Sinco",
    null,
    [
      [453, "Since Sinco met him"]
    ]
  ),

  createCharacter(
    "Docaci",
    "Speedster mother of Sinco, got her powers drained by Tirok",
    "1993-03-14",
    [
      [287, "Before her powers were drained"],
      [12, "After her powers were drained"]
    ],
    ["Calm Super"]
  ),

  createCharacter(
    "Karo",
    "Speedster grandfather of Sinco, the reason Docaci and Sinco are speedsters, Karo is the first person to go super on earth",
    "1974-06-23",
    [
      [416, "After going super for the first time"],
      [334, "After getting speedster powers", true],
      [2, "Before getting speedster powers"]
    ],
    ["Super"]
  )
];