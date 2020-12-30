import {
  validateAllowedCharacters,
  validateEmpty,
  validateOneOf,
} from "utilities/validators";
import { randomKey } from "utilities/misc";
import {
  EXERCISE_TYPES,
  EXERCISE_TYPES_DISPLAY,
  MUSCLES,
  MUSCLES_DISPLAY,
  ASCII_AND_DIGITS,
} from "utilities/models";

const formDataInitial = {
  values: {
    name: "",
    kind: "",
    instructions: "",
    tags: [],
    muscles: [],
    tutorials: [],
  },
  errors: {
    name: [],
    kind: [],
    instructions: [],
    tags: [],
    muscles: [],
    tutorials: [],
  },
};

const fieldProps = {
  _simpleFields: ["name", "kind", "instructions"],
  _listFields: ["tags", "muscles", "tutorials"],
  _nestedFields: [],
  name: {
    label: "Name",
    htmlName: "name",
    placeholder: "exercise name",
    validators: [validateEmpty("Please provide exercise name.")],
  },
  kind: {
    label: "Type",
    htmlName: "kind",
    placeholder: "exercise type",
    options: EXERCISE_TYPES.concat(["inc"]),
    optionsDisplay: EXERCISE_TYPES_DISPLAY.concat(["incorrect"]),
    validators: [
      validateEmpty("Please select exercise type."),
      validateOneOf(EXERCISE_TYPES, "Incorrect exercise type."),
    ],
  },
  instructions: {
    label: "Instructions",
    htmlName: "instructions",
    placeholder: "exercise instructions",
  },
  tags: {
    _limit: 5,
    _simpleFields: ["name"],
    name: {
      label: null,
      htmlName: "tags__name",
      placeholder: "enter tag",
      validators: [
        validateEmpty("Please insert tag name or remove this field."),
        validateAllowedCharacters(
          ASCII_AND_DIGITS,
          "Tag can only contain letters and digits an not spaces."
        ),
      ],
    },
  },
  muscles: {
    _limit: MUSCLES.length,
    _simpleFields: ["name"],
    name: {
      label: null,
      htmlName: "muscles__name",
      placeholder: "select muscle",
      options: MUSCLES.concat(["inc1", "inc2"]),
      optionsDisplay: MUSCLES_DISPLAY.concat(["Incorrect 1", "Incorrect 2"]),
      validators: [
        validateEmpty("Please select muscle or remove this field."),
        validateOneOf(MUSCLES, "Incorrect muscle."),
      ],
    },
  },
  tutorials: {
    _limit: 5,
    _simpleFields: ["url"],
    url: {
      label: null,
      htmlName: "tutorials__url",
      placeholder: "add tutorial",
      validators: [
        validateEmpty("Please provide YouTube url or remove this field."),
      ],
    },
  },
};

const formDataFromExercise = (exercise) => {
  const values = {
    name: exercise.name,
    kind: exercise.kind,
    instructions: exercise.instructions,
    tags: exercise.tags.map(randomKey),
    muscles: exercise.muscles.map(randomKey),
    tutorials: exercise.tutorials.map(randomKey),
  };
  const errors = {
    name: [],
    kind: [],
    instructions: [],
    tags: Array(exercise.tags.length).fill({}),
    muscles: Array(exercise.muscles.length).fill({}),
    tutorials: Array(exercise.tutorials.length).fill({}),
  };
  return { values, errors };
};

export { fieldProps, formDataInitial, formDataFromExercise };
