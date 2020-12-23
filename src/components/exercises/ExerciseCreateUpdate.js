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
import { formReducer, FORM_ACTIONS } from "reducers/form";

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

const formDataFromExercise = (exercise) => {
  const values = {
    name: exercise.name,
    kind: exercise.kind,
    instructions: exercise.instructions,
    tags: exercise.tags,
    muscles: exercise.muscles,
    tutorials: exercise.tutorials,
  };
  const errors = {
    name: [],
    kind: [],
    instructions: [],
    tags: Array(exercise.tags.length).fill({}),
    muscles: Array(exercise.muscles.length).fill({}),
    tutorials: Array(exercise.tutorials.length).fill({}),
  };
  return { values, errors, isValid: true };
};

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

    if (operation === "create") {
      createExercise(formData.values).then(([isCreated, json]) => {
        if (isCreated) {
          history.push(`${routes.app.exercises.myExercises}`);
          notify({
            message: `Successfully created ${formData.values.name} exercise.`,
            type: "success",
          });
        } else {
          notify({
            message: "Form has errors. Fix them and resubmit again.",
            type: "error",
          });
          dispatch({ type: FORM_ACTIONS.SET_ERRORS, errors: json });
        }
      });
    } else if (operation === "edit") {
      editExercise(formData.values, exerciseId).then(([isEdited, json]) => {
        if (isEdited) {
          history.push(`${routes.app.exercises.exercise}${exerciseId}`);
          notify({
            message: `Successfully edited ${formData.values.name} exercise.`,
            type: "success",
          });
        } else {
          notify({
            message: "Form has errors. Fix them and resubmit again.",
            type: "error",
          });
          dispatch({ type: FORM_ACTIONS.SET_ERRORS, errors: json });
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
          type: FORM_ACTIONS.SET_STATE,
          state: formDataFromExercise(exercise),
        });
      }
    });
  };

  const populateFormData = () => {
    if (operation === "create") {
      dispatch({ type: FORM_ACTIONS.SET_STATE, state: formDataInitial() });
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
