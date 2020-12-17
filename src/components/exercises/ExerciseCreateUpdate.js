import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useNotify } from "context/NotificationProvider";

import routes from "utilities/routes";
import { isEmpty } from "utilities/misc";
import styles from "./ExerciseCreateUpdate.module.scss";
import ExerciseForm from "./ExerciseForm";
import {
  editExercise,
  createExercise,
  fetchExercise,
} from "services/Exercises";

export const ACTIONS = {
  SET_STATE: "set_state",
  SET_ERRORS: "set_errors",
  SET_FIELD: "set_field",
  ADD_TO_FIELD: "add_to_field",
  REMOVE_FROM_FIELD: "remove_from_field",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_ERRORS:
      return { ...state, errors: { ...state.errors, ...action.errors } };
    case ACTIONS.SET_FIELD:
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
      };
    case ACTIONS.ADD_TO_FIELD:
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: [
            ...state.values[action.field],
            { [action.jsonKey]: action.value },
          ],
        },
      };
    case ACTIONS.REMOVE_FROM_FIELD:
      return {
        errors: {
          ...state.errors,
          [action.field]: [
            ...state.errors[action.field].filter(
              (e, idx) => idx !== action.index
            ),
          ],
        },
        values: {
          ...state.values,
          [action.field]: [
            ...state.values[action.field].filter(
              (v, idx) => idx !== action.index
            ),
          ],
        },
      };
    case ACTIONS.SET_STATE:
      return action.state;
    default:
      return state;
  }
};

const formDataInitial = () => ({
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
});

const formDataFromExercise = (exercise) => ({
  values: Object.entries(exercise).reduce(
    (o, [k, v]) => ({ ...o, [k]: v }),
    {}
  ),
  errors: Object.entries(exercise).reduce(
    (o, [k, v]) => ({ ...o, [k]: [] }),
    {}
  ),
});

function ExerciseCreateUpdate({ operation }) {
  const [formData, dispatch] = useReducer(formReducer, null);
  const { id: exerciseId } = useParams();
  const notify = useNotify();
  const history = useHistory();

  const handleCancel = (e) => {
    history.goBack();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: formData.values.name,
      ...(formData.values.kind !== "" && { kind: formData.values.kind }),
      instructions: formData.values.instructions,
      tags: formData.values.tags,
      muscles: formData.values.muscles,
      tutorials: formData.values.tutorials,
    };

    if (operation === "create") {
      createExercise(data).then(([isCreated, json]) => {
        if (isCreated) {
          history.push(`${routes.app.exercises.myExercises}`);
          notify({
            message: `Successfully created ${data.name} exercise.`,
            type: "success",
          });
        } else {
          notify({
            message: "Form has errors. Fix them and resubmit again.",
            type: "error",
          });
          dispatch({ type: ACTIONS.SET_ERRORS, errors: json });
        }
      });
    } else if (operation === "edit") {
      editExercise(data, exerciseId).then(([isEdited, json]) => {
        if (isEdited) {
          history.push(`${routes.app.exercises.exercise}${exerciseId}`);
          notify({
            message: `Successfully edited ${data.name} exercise.`,
            type: "success",
          });
        } else {
          notify({
            message: "Form has errors. Fix them and resubmit again.",
            type: "error",
          });
          dispatch({ type: ACTIONS.SET_ERRORS, errors: json });
        }
      });
    }
  };

  const fetchData = () => {
    fetchExercise(exerciseId).then((exercise) => {
      if (isEmpty(exercise)) {
        history.push(routes.notFound);
      } else {
        dispatch({
          type: ACTIONS.SET_STATE,
          state: formDataFromExercise(exercise),
        });
      }
    });
  };

  const populateFormData = () => {
    if (operation === "create") {
      dispatch({ type: ACTIONS.SET_STATE, state: formDataInitial() });
    } else if (operation === "edit") {
      fetchData();
    }
  };

  useEffect(populateFormData, []);

  return (
    <>
      <h1 className={styles.title}>{`${operation} exercise`} </h1>
      {formData && (
        <ExerciseForm
          formData={formData}
          dispatch={dispatch}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        ></ExerciseForm>
      )}
    </>
  );
}

export default ExerciseCreateUpdate;
