import { isEmpty, isString, isNumber, isBoolean, isObject } from "utilities/misc";

const FORM_ACTIONS = {
  SET_STATE: "set_state",
  SET_VALUES: "set_values",
  SET_ERRORS: "set_errors",
  RESET_ERRORS: "reset_errors",
  UPDATE_ERRORS: "update_errors",
  CHANGE_FIELD: "change_field",
  CHANGE_NESTED_FIELD: "change_nested_field",
  CHANGE_LIST_FIELD: "change_list_field",
  APPEND_TO_LIST: "append_to_list",
  REMOVE_FROM_LIST: "remove_from_list",
};

const emptyErrors = (state) =>
  Object.fromEntries(
    Object.entries(state.values).map(([field, value]) => {
      if (isString(value) || isNumber(value) || isBoolean(value)) {
        return [field, []];
      } else if (Array.isArray(value)) {
        return [field, value.map((_) => ({}))];
      } else if (isObject(value)) {
        return [field, {}];
      } else {
        throw new Error();
      }
    })
  );

/**
 * General rules of form state:
 * - form state is the only source of truth about form values
 * - form state has at least two properies: values (representing form data) and errors (representing
 *   form errors)
 * - form errors tightly resemble form values at all points of time
 * - there are three types of fields:
 *    - simple fields (like input, select or textarea representing single form value)
 *    - compound fields (representing independent entities like exercise, routine, etc.)
 */
const formReducer = (state, action) => {
  let listName;
  let fieldName;
  switch (action.type) {
    case FORM_ACTIONS.SET_STATE:
      // action.state
      return action.state;
    case FORM_ACTIONS.SET_VALUES:
      // action.values
      return { ...state, values: action.values };
    case FORM_ACTIONS.SET_ERRORS:
      // action.errors
      return { ...state, errors: action.errors };
    case FORM_ACTIONS.RESET_ERRORS:
      return { ...state, errors: emptyErrors(state) };
    case FORM_ACTIONS.UPDATE_ERRORS:
      // action.errors
      return { ...state, errors: { ...emptyErrors(state), ...action.errors } };
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
      [listName, fieldName] = action.name.split("__");
      if (!(listName in state.values) || !(fieldName in state.values[listName][action.index])) {
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
          [action.name]: state.errors[action.name].filter((_, i) => i !== action.index),
        },
        values: {
          ...state.values,
          [action.name]: state.values[action.name].filter((_, i) => i !== action.index),
        },
      };
    default:
      throw new Error(`Unhadled action type ${action.type}`);
  }
};

/**
 * Validate form data using fixed fieldProps structure. Validation is based on validators fields of
 * fieldProps object. This function returns promise which resolves without value when form is valid
 * or reject with errors object when form is invalid. Errors object resembles defaul backend errors
 * object.
 *
 * @param {object} fieldProps - Form field properties.
 * @param {object} formData - Representation of form data.
 */
const validateForm = (fieldProps, formData) =>
  new Promise((resolve, reject) => {
    const errors = {};
    // Simple fields
    if ("_simpleFields" in fieldProps) {
      fieldProps._simpleFields.forEach((fieldName) => {
        if ("validators" in fieldProps[fieldName]) {
          try {
            fieldProps[fieldName].validators.forEach((validate) => {
              validate(formData.values[fieldName]);
            });
          } catch (error) {
            errors[fieldName] = [error.message];
          }
        }
      });
    }
    // Nested fields
    // ! to be implemented
    // List fields
    if ("_listFields" in fieldProps) {
      fieldProps._listFields.forEach((listFieldName) => {
        if ("_simpleFields" in fieldProps[listFieldName]) {
          fieldProps[listFieldName]._simpleFields.forEach((fieldName) => {
            if ("validators" in fieldProps[listFieldName][fieldName]) {
              formData.values[listFieldName].forEach((obj, index) => {
                try {
                  fieldProps[listFieldName][fieldName].validators.forEach((validate) => {
                    validate(obj[fieldName]);
                  });
                } catch (error) {
                  // Adds error field when at least one value is wrong
                  if (!(listFieldName in errors)) {
                    errors[listFieldName] = new Array(formData.values[listFieldName].length)
                      .fill(null)
                      .map(() => ({}));
                  }
                  errors[listFieldName][index][fieldName] = [error.message];
                }
              });
            }
          });
        }
      });
    }
    if (isEmpty(errors)) {
      resolve();
    } else {
      reject(errors);
    }
  });

const handleChangeField = (dispatch) => (e) => {
  dispatch({
    type: FORM_ACTIONS.CHANGE_FIELD,
    name: e.target.name,
    value: e.target.value,
  });
};

export { FORM_ACTIONS, formReducer, validateForm, handleChangeField };
