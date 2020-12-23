const FORM_ACTIONS = {
  SET_ERRORS: "set_errors",
  SET_STATE: "set_state",
  CHANGE_FIELD: "change_field",
  CHANGE_NESTED_FIELD: "change_nested_field",
  CHANGE_LIST_FIELD: "change_list_field",
  APPEND_TO_LIST: "append_to_list",
  REMOVE_FROM_LIST: "remove_from_list",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_ACTIONS.SET_ERRORS:
      return { ...state, errors: { ...state.errors, ...action.errors } };
    case FORM_ACTIONS.CHANGE_FIELD:
      // action.name
      // action.value
      if (!(action.name in state.values)) {
        throw new Error(`Field ${action.name} is not part of the state`);
      }
      return {
        ...state,
        values: { ...state.values, [action.name]: action.value },
      };
    case FORM_ACTIONS.CHANGE_LIST_FIELD:
      // action.name
      // action.index
      // action.value
      const [listName, fieldName] = action.name.split("__");
      if (
        !(listName in state.values) ||
        !(fieldName in state.values[listName][action.index])
      ) {
        throw new Error(
          `List field ${action.name} with index ${action.index} is not part of the state`
        );
      }
      return {
        ...state,
        values: {
          ...state.values,
          [listName]: state.values[listName].map((obj, i) =>
            i !== action.index ? obj : { ...obj, [fieldName]: action.value }
          ),
        },
      };
    case FORM_ACTIONS.APPEND_TO_LIST:
      // action.name - Name attribute of list
      // action.object - formData list object including randomly generated key
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.name]: [...state.errors[action.name], {}],
        },
        values: {
          ...state.values,
          [action.name]: [...state.values[action.name], action.object],
        },
      };
    case FORM_ACTIONS.REMOVE_FROM_LIST:
      // aciton.name - Name attribute of list.
      // action.index - Array index of object to remove.
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.name]: state.errors[action.name].filter(
            (obj, i) => i !== action.index
          ),
        },
        values: {
          ...state.values,
          [action.name]: state.values[action.name].filter(
            (obj, i) => i !== action.index
          ),
        },
      };
    case FORM_ACTIONS.SET_STATE:
      // action.state
      return action.state;
    default:
      throw new Error(`Unhadled action type ${action.type}`);
  }
};

export { FORM_ACTIONS, formReducer };
