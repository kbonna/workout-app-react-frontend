import { ACTIONS } from "components/common/SignupForm";
import { FORM_ACTIONS, formReducer } from "./form";
import { v4 as uuidv4 } from "uuid";

describe("Form reducer", () => {
  let initState;

  beforeEach(() => {
    initState = {
      values: {
        username: "username1",
        grade: "grade1",
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
      error: {
        username: [],
        grade: [],
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

  it("action: set value", () => {
    const action = {
      type: FORM_ACTIONS.SET_VALUE,
      name: "username",
      value: "new",
    };
    const reducedState = formReducer(initState, action);

    const newState = JSON.parse(JSON.stringify(initState));
    newState.values.username = "new";

    expect(newState).toEqual(reducedState);
  });

  it("action: set value error (incorrect field name)", () => {
    const action = {
      type: FORM_ACTIONS.SET_VALUE,
      name: "non_existing_field",
      value: "new",
    };

    expect(() => {
      formReducer(initState, action);
    }).toThrow(Error);
  });
});
