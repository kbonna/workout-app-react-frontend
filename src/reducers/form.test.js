import { FORM_ACTIONS, formReducer } from "./form";
import { v4 as uuidv4 } from "uuid";

describe("Form reducer", () => {
  let initState;

  beforeEach(() => {
    initState = {
      values: {
        username: "username1",
        yearOfBirth: 1990,
        address: {
          key: uuidv4(),
          street: "Elm street",
          country: "Poland",
          zipCode: 123,
        },
        tags: [
          { key: uuidv4(), name: "tag1" },
          { key: uuidv4(), name: "tag2" },
          { key: uuidv4(), name: "tag3+" },
        ],
        exercises: [
          { key: uuidv4(), name: "exercise1", sets: 3, instructions: "" },
          { key: uuidv4(), name: "exercise2", sets: 3, instructions: "Lorem" },
          { key: uuidv4(), name: "", sets: -1, instructions: "" },
        ],
      },
      errors: {
        username: [],
        yearOfBirth: [],
        address: {},
        tags: [{}, {}, { name: ["Incorrect character used."] }],
        exercises: [
          {},
          {},
          {
            name: ["Exercise name cannot be null."],
            sets: ["Number of sets cannot be negative."],
          },
        ],
      },
    };
  });

  it(`action: ${FORM_ACTIONS.SET_STATE}`, () => {
    const action = {
      type: FORM_ACTIONS.SET_STATE,
      state: { stateProp: "stateValue" },
    };
    const reducedState = formReducer(initState, action);
    expect(reducedState).toEqual({ stateProp: "stateValue" });
  });

  it(`action: ${FORM_ACTIONS.SET_VALUES}`, () => {
    const action = {
      type: FORM_ACTIONS.SET_VALUES,
      values: { valuesProp: "valuesValue" },
    };
    const reducedState = formReducer(initState, action);
    expect(reducedState.values).toEqual({ valuesProp: "valuesValue" });
  });

  it(`action: ${FORM_ACTIONS.SET_ERRORS}`, () => {
    const action = {
      type: FORM_ACTIONS.SET_ERRORS,
      errors: { errorsProp: "errorsValue" },
    };
    const reducedState = formReducer(initState, action);
    expect(reducedState.errors).toEqual({ errorsProp: "errorsValue" });
  });

  it(`action: ${FORM_ACTIONS.RESET_ERRORS}`, () => {
    const action = {
      type: FORM_ACTIONS.RESET_ERRORS,
    };
    const reducedState = formReducer(initState, action);
    const emptyErrors = {
      username: [],
      yearOfBirth: [],
      address: {},
      tags: [{}, {}, {}],
      exercises: [{}, {}, {}],
    };
    expect(reducedState.errors).toEqual(emptyErrors);
  });

  it(`action: ${FORM_ACTIONS.UPDATE_ERRORS} (only simple fields)`, () => {
    const action = {
      type: FORM_ACTIONS.UPDATE_ERRORS,
      errors: { username: ["Error 1"], yearOfBirth: ["Error 1", "Error 2"] },
    };
    const reducedState = formReducer(initState, action);
    const updatedErrors = {
      username: ["Error 1"],
      yearOfBirth: ["Error 1", "Error 2"],
      address: {},
      tags: [{}, {}, {}],
      exercises: [{}, {}, {}],
    };
    expect(reducedState.errors).toEqual(updatedErrors);
  });

  it(`action: ${FORM_ACTIONS.UPDATE_ERRORS} (only nested fields)`, () => {
    const action = {
      type: FORM_ACTIONS.UPDATE_ERRORS,
      errors: { address: { street: ["Error 1"], country: [], zipCode: [] } },
    };
    const reducedState = formReducer(initState, action);
    const updatedErrors = {
      username: [],
      yearOfBirth: [],
      address: { street: ["Error 1"], country: [], zipCode: [] },
      tags: [{}, {}, {}],
      exercises: [{}, {}, {}],
    };
    expect(reducedState.errors).toEqual(updatedErrors);
  });

  it(`action: ${FORM_ACTIONS.UPDATE_ERRORS} (only list fields)`, () => {
    const action = {
      type: FORM_ACTIONS.UPDATE_ERRORS,
      errors: {
        exercises: [{}, {}, { name: ["Error 1"], sets: [], instructions: [] }],
      },
    };
    const reducedState = formReducer(initState, action);
    const updatedErrors = {
      username: [],
      yearOfBirth: [],
      address: {},
      tags: [{}, {}, {}],
      exercises: [{}, {}, { name: ["Error 1"], sets: [], instructions: [] }],
    };
    expect(reducedState.errors).toEqual(updatedErrors);
  });

  it(`action: ${FORM_ACTIONS.CHANGE_FIELD}`, () => {
    const action = {
      type: FORM_ACTIONS.CHANGE_FIELD,
      name: "username",
      value: "new_username",
    };
    const reducedState = formReducer(initState, action);
    expect(reducedState.values.username).toEqual("new_username");
  });

  it(`action: ${FORM_ACTIONS.CHANGE_FIELD} (incorrect field name)`, () => {
    const action = {
      type: FORM_ACTIONS.SET_VALUE,
      name: "non_existing_field",
      value: "",
    };
    expect(() => {
      formReducer(initState, action);
    }).toThrow(Error);
  });

  it(`action: ${FORM_ACTIONS.CHANGE_LIST_FIELD} (object with only one field)`, () => {
    const action = {
      type: FORM_ACTIONS.CHANGE_LIST_FIELD,
      name: "tags__name",
      index: 0,
      value: "new_tag",
    };
    const reducedState = formReducer(initState, action);
    expect(reducedState.values.tags[0].name).toEqual("new_tag");
  });

  it(`action: ${FORM_ACTIONS.CHANGE_LIST_FIELD} (object with multiple fields)`, () => {
    const action = {
      type: FORM_ACTIONS.CHANGE_LIST_FIELD,
      name: "exercises__instructions",
      index: 1,
      value: "new_instructions",
    };
    const reducedState = formReducer(initState, action);
    expect(reducedState.values.exercises[1].instructions).toEqual(
      "new_instructions"
    );
  });

  it(`action: ${FORM_ACTIONS.CHANGE_NESTED_FIELD} (incorrect subfield name)`, () => {
    const action = {
      type: FORM_ACTIONS.SET_VALUE,
      name: "tags__non_existing_field",
      value: "",
    };
    expect(() => {
      formReducer(initState, action);
    }).toThrow(Error);
  });

  it(`action: ${FORM_ACTIONS.APPEND_TO_LIST}`, () => {
    const key = uuidv4();
    const action = {
      type: FORM_ACTIONS.APPEND_TO_LIST,
      name: "tags",
      object: { key, name: "tag4" },
    };
    const reducedState = formReducer(initState, action);
    expect(reducedState.values.tags[3]).toEqual({ key, name: "tag4" });
  });

  it(`action: ${FORM_ACTIONS.REMOVE_FROM_LIST}`, () => {
    const action = {
      type: FORM_ACTIONS.REMOVE_FROM_LIST,
      name: "tags",
      index: 1,
    };
    const tags = JSON.parse(JSON.stringify(initState.values.tags));
    tags.splice(1, 1);
    const reducedState = formReducer(initState, action);
    expect(reducedState.values.tags).toEqual(tags);
  });
});
