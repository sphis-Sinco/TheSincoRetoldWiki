// Form multipliers map stays as-is for easy updating
export const allFormMultipliers = {
  Super: 1.10,
  CalmSuper: 1.05,
  SuperGrade2: 1.20,
  FuryForm: 1.40,
  HyperForm: 1.70,
  HyperRageForm: 1.90,
  HyperRemnant: 1.50,
};

/**
 * Enum of valid form names to avoid magic strings and typos.
 */
export const FormNames = Object.freeze({
  SUPER: "Super",
  CALM_SUPER: "CalmSuper",
  SUPER_GRADE_2: "SuperGrade2",
  FURY_FORM: "FuryForm",
  HYPER_FORM: "HyperForm",
  HYPER_RAGE_FORM: "HyperRageForm",
  HYPER_REMNANT: "HyperRemnant",
});

/**
 * Helper: generate enra readings array
 * 
 * @param {Array.<[number, string, boolean]>} readings Array of tuples [value, context, isBase?]
 * @returns {Array.<{value: number, context: string, formBaseEnra?: boolean}>} enra objects
 */
function generateEnra(readings) {
  return readings.map(([value, context, formBaseEnra = false]) => ({
    value,
    context,
    ...(formBaseEnra ? { formBaseEnra: true } : {}),
  }));
}

/**
 * Simple ISO 8601 date validation
 * @param {string|null} dateStr
 * @returns {boolean}
 */
function isValidDate(dateStr) {
  if (dateStr === null) return true;
  if (typeof dateStr !== "string") return false;
  const date = new Date(dateStr);
  return !isNaN(date.getTime()) && dateStr === date.toISOString().slice(0, 10);
}

/**
 * Helper: create character profile object easily
 * 
 * @param {string} name
 * @param {string} description
 * @param {string|null} birthday  - ISO date string YYYY-MM-DD or null if unknown
 * @param {Array.<[number, string, boolean?]>} enraReadings - array of tuples [value, context, formBaseEnra?]
 * @param {string[]} forms - array of form names (strings)
 * @param {object[]} variations - array of character variations (optional)
 * @returns {object} character profile
 * @throws {Error} on invalid input
 */
export function createCharacter(name, description, birthday, enraReadings, forms = [], variations = []) {
  // Validation
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("Character name must be a non-empty string");
  }
  if (typeof description !== "string") {
    throw new Error("Character description must be a string");
  }
  if (!isValidDate(birthday)) {
    throw new Error(`Invalid birthday date format: ${birthday}`);
  }
  if (!Array.isArray(enraReadings)) {
    throw new Error("enraReadings must be an array");
  }
  enraReadings.forEach((item, idx) => {
    if (
      !Array.isArray(item) ||
      typeof item[0] !== "number" ||
      typeof item[1] !== "string" ||
      (item[2] !== undefined && typeof item[2] !== "boolean")
    ) {
      throw new Error(`Invalid enraReadings tuple at index ${idx}`);
    }
  });
  if (!Array.isArray(forms)) {
    throw new Error("forms must be an array");
  }
  forms.forEach((form, idx) => {
    if (typeof form !== "string") {
      throw new Error(`Invalid form name at index ${idx}`);
    }
  });
  if (!Array.isArray(variations)) {
    throw new Error("variations must be an array");
  }
  variations.forEach((variation, idx) => {
    if (typeof variation !== "object" || variation === null) {
      throw new Error(`Invalid variation at index ${idx}`);
    }
  });

  return {
    name,
    description,
    birthday,
    enra: generateEnra(enraReadings),
    forms,
    variations,
  };
}

// Export characters array using the helper and enum constants for forms
export const characters = [
  createCharacter(
    "Sinco",
    "Teenage Speedster Hero of Tempo City",
    "2011-09-19",
    [[1080, "After training in the afterlife with Karo"]],
    [
      FormNames.SUPER,
      FormNames.CALM_SUPER,
      FormNames.SUPER_GRADE_2,
      FormNames.FURY_FORM,
      FormNames.HYPER_FORM,
      FormNames.HYPER_REMNANT,
    ],
    [
      createCharacter(
        "Sinco (Timeline V5B)",
        "Sinco months later after failing to make his wish in the Titan-T saga",
        "2011-09-19",
        [],
        [FormNames.HYPER_FORM]
      ),
    ]
  ),

  createCharacter(
    "TJ",
    "Teenage Speedster Hero of Boredom City",
    "2011-04-03",
    [],
    [FormNames.CALM_SUPER]
  ),

  createCharacter(
    "Tirok",
    "Anti-Hero engineer and scientist",
    "2000-04-05",
    []
  ),

  createCharacter(
    "Osin",
    "A clone of Sinco made by Tirok",
    "2023-10-08",
    [
      [1257, "Rage Boost power during Titan-T arc (Volume 4)"],
      [1020, "Resting power during Titan-T arc (Volume 4)", true],
      [855, "During Squad 2 Invasion with a Rage boost"],
      [570, "During Squad 2 Invasion"],
    ],
    [FormNames.CALM_SUPER, FormNames.HYPER_FORM, FormNames.HYPER_RAGE_FORM]
  ),

  createCharacter(
    "Crepode",
    "Famous creator of the Fuerza technique used by Sinco",
    null,
    []
  ),

  createCharacter(
    "Docaci",
    "Speedster mother of Sinco, got her powers drained by Tirok",
    "1993-03-14",
    [],
    [FormNames.CALM_SUPER]
  ),

  createCharacter(
    "Karo",
    "Speedster grandfather of Sinco, the reason Docaci and Sinco are speedsters, Karo is the first person to go super on earth",
    "1974-06-23",
    [],
    [FormNames.SUPER]
  ),
];