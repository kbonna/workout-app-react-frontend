import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useNotify } from "context/NotificationProvider";

import ExerciseForm from "./ExerciseForm";
import styles from "./ExerciseCreateUpdate.module.scss";

import PropTypes from "prop-types";
import {
  editExercise,
  createExercise,
  fetchExercise,
} from "services/Exercises";
import {
  fieldProps,
  formDataFromExercise,
  formDataInitial,
} from "forms/exercise";
import { formReducer, FORM_ACTIONS, validateForm } from "reducers/form";
import { isEmpty } from "utilities/misc";
import routes from "utilities/routes";

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

    validateForm(fieldProps, formData)
      .then(() => {
        const submitPromise =
          operation === "create"
            ? createExercise(formData.values)
            : editExercise(formData.values, exerciseId);
        submitPromise.then(([isSuccess, data]) => {
          if (isSuccess) {
            history.push(`${routes.app.exercises.exercise}${data.pk}`);
            notify({
              message: `Successfully ${operation}ed ${data.name} exercise.`,
              type: "success",
            });
          } else {
            notify({
              message: "Form has errors. Fix them and resubmit again.",
              type: "error",
            });
            const errors =
              "non_field_errors" in data
                ? { ...data, name: data.non_field_errors }
                : data;
            dispatch({ type: FORM_ACTIONS.UPDATE_ERRORS, errors });
          }
        });
      })
      .catch((errors) => {
        notify({
          message: "Form has errors. Fix them and resubmit again.",
          type: "error",
        });
        dispatch({ type: FORM_ACTIONS.UPDATE_ERRORS, errors });
      });
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
      dispatch({ type: FORM_ACTIONS.SET_STATE, state: formDataInitial });
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
          fieldProps={fieldProps}
          formData={formData}
          dispatch={dispatch}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        ></ExerciseForm>
      )}
    </>
  );
}

ExerciseCreateUpdate.propTypes = {
  operation: PropTypes.oneOf(["create", "edit"]),
};

export default ExerciseCreateUpdate;
