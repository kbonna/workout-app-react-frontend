import React, { useState, useContext, useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";

import { isEmpty } from "utilities/misc";
import { editExercise, fetchExercise } from "services/Exercises";

import { useNotification } from "components/context/NotificationProvider";
import routes from "utilities/routes";
import { UserContext } from "components/App";
import ExerciseForm from "./ExerciseForm";
import styles from "./ExerciseNewPage.module.scss";

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
      console.log("adding to field", action.field, action.value);
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: [...state.values[action.field], action.value],
        },
      };
    case ACTIONS.REMOVE_FROM_FIELD:
      const newValues = state.values[action.field];
      newValues.splice(action.index);
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: newValues,
        },
      };
    case ACTIONS.SET_STATE:
      return action.state;
    default:
      return state;
  }
};

function ExerciseEditPage() {
  const [formData, dispatch] = useReducer(formReducer);

  const { userId } = useContext(UserContext);
  const { id: exerciseId } = useParams();
  const notify = useNotification();
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
        console.log(formData);
      }
    });
  };

  const fetchData = () => {
    if (userId) {
      fetchExercise(exerciseId).then((exercise) => {
        if (isEmpty(exercise)) {
          console.log("404!"); // TODO: redirect to 404
        } else {
          dispatch({
            type: ACTIONS.SET_STATE,
            state: {
              values: {
                name: exercise.name,
                kind: exercise.kind,
                instructions: exercise.instructions,
                tags: exercise.tags,
                muscles: exercise.muscles,
                tutorials: exercise.tutorials,
              },
              errors: {
                name: [],
                kind: [],
                instructions: [],
                tags: [],
                muscles: [],
                tutorials: [],
              },
            },
          });
        }
      });
    }
  };

  useEffect(fetchData, [userId]);

  return (
    <>
      <h1 className={styles.title}>Edit exercise</h1>
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

export default ExerciseEditPage;
