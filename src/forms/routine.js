import { validateEmpty, validateOneOf, validateRange } from "utilities/validators";
import { randomKey } from "utilities/misc";
import { ROUTINE_TYPES, ROUTINE_TYPES_DISPLAY } from "utilities/models";

const fieldProps = {
  _simpleFields: ["name", "kind", "instructions"],
  _listFields: ["exercises"],
  _nestedFields: [],
  name: {
    label: "Name",
    htmlName: "name",
    placeholder: "routine name",
    validators: [validateEmpty("Please provide routine name.")],
  },
  kind: {
    label: "Type",
    htmlName: "kind",
    placeholder: "routine type",
    options: ROUTINE_TYPES.concat(["inc"]),
    optionsDisplay: ROUTINE_TYPES_DISPLAY.concat(["incorrect"]),
    validators: [
      validateEmpty("Please select exercise type."),
      validateOneOf(ROUTINE_TYPES, "Incorrect exercise type."),
    ],
  },
  instructions: {
    label: "Instructions",
    htmlName: "instructions",
    placeholder: "exercise instructions",
  },
  exercises: {
    _limit: 10,
    _simpleFields: ["exercise", "sets", "instructions"],
    exercise: {
      label: "Exercise",
      htmlName: "exercises__exercise",
      placeholder: "select exercise",
      modifier: (value) => parseInt(value),
      validators: [validateEmpty("Please select exercise.")],
    },
    sets: {
      label: "Sets",
      htmlName: "exercises__sets",
      placeholder: "number of sets",
      type: "number",
      modifier: (value) => parseInt(value),
      validators: [
        validateRange(1, 50, "Number of sets should be at least 1 and no more than 50."),
      ],
      minValue: 1,
      maxValue: 50,
    },
    instructions: {
      label: "Instructions",
      htmlName: "exercises__instructions",
      placeholder: "additional instructions",
      modifier: (value) => value,
    },
  },
};

const formDataInitial = {
  values: {
    name: "",
    kind: "",
    instructions: "",
    exercises: [],
  },
  errors: {
    name: [],
    kind: [],
    instructions: [],
    exercises: [],
  },
};

const formDataFromRoutine = (routine) => {
  // Exclude unnecessary fields from routine.exercises objects
  const allowedKeys = ["exercise", "sets", "instructions"];
  const exercises = routine.exercises.map((routineUnit) =>
    Object.fromEntries(allowedKeys.map((k) => [k, routineUnit[k]]))
  );

  const values = {
    name: routine.name,
    kind: routine.kind,
    instructions: routine.instructions,
    exercises: exercises.map(randomKey),
  };
  const errors = {
    name: [],
    kind: [],
    instructions: [],
    exercises: Array(routine.exercises.length).fill({}),
  };
  return { values, errors };
};

export { fieldProps, formDataInitial, formDataFromRoutine };
