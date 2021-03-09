import React, { useState, useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useUser } from "context/UserProvider";
import { useNotify } from "context/NotificationProvider";

import CenteredSpinner from "components/reusable/CenteredSpinner";
import RoutineForm from "./RoutineForm";

import routes from "utilities/routes";
import { createRoutine } from "services/routines";
import { fetchRoutine, updateRoutine } from "services/routines";
import { fetchExercises } from "services/exercises";
import { formReducer, FORM_ACTIONS, validateForm } from "reducers/form";
import { formDataFromRoutine, formDataInitial, fieldProps } from "forms/routine";
import { ROUTINE_ACTIONS } from "./Routines";

const RoutineCreateUpdate = ({ action }) => {
  const [availableExercises, setAvailableExercises] = useState(null);
  const [formData, dispatch] = useReducer(formReducer, null);
  const { id: routineId } = useParams();
  const history = useHistory();
  const notify = useNotify();
  const user = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validateForm(fieldProps, formData);
      const data =
        action === ROUTINE_ACTIONS.CREATE
          ? await createRoutine(formData.values)
          : await updateRoutine(formData.values, routineId);
      history.push(`${routes.app.routines.routine}${data.pk}`);
      notify({
        message: `Successfully ${action}ed ${data.name} exercise.`,
        type: "success",
      });
    } catch (errors) {
      notify({
        message: "Form has errors. Fix them and resubmit again.",
        type: "error",
      });
      dispatch({
        type: FORM_ACTIONS.UPDATE_ERRORS,
        errors: {
          ...errors,
          ...("non_field_errors" in errors && {
            name: errors["non_field_errors"],
          }),
        },
      });
    }
  };

  const handleCancel = (e) => {
    history.goBack();
  };

  const fetchData = () => {
    if (action === ROUTINE_ACTIONS.CREATE) {
      dispatch({ type: FORM_ACTIONS.SET_STATE, state: formDataInitial });
      fetchExercises(user.pk)
        .then((availableExercises) => {
          setAvailableExercises(availableExercises);
        })
        .catch(() => {
          history.replace(routes.notFound);
        });
    } else if (action === ROUTINE_ACTIONS.UPDATE) {
      Promise.all([fetchRoutine(routineId), fetchExercises(user.pk)])
        .then(([routine, availableExercises]) => {
          if (!routine.can_be_modified) {
            history.replace(routes.forbidden);
          } else {
            dispatch({
              type: FORM_ACTIONS.SET_STATE,
              state: formDataFromRoutine(routine),
            });
            setAvailableExercises(availableExercises);
          }
        })
        .catch(() => history.replace(routes.notFound));
    }
  };

  useEffect(fetchData, []);

  return (formData === null) | (availableExercises === null) ? (
    <CenteredSpinner></CenteredSpinner>
  ) : (
    <>
      <h1 className={"mb-5"}>{`${
        action === ROUTINE_ACTIONS.CREATE ? "Create" : "Edit"
      } routine`}</h1>
      <RoutineForm
        fieldProps={fieldProps}
        formData={formData}
        dispatch={dispatch}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        availableExercises={availableExercises}
      ></RoutineForm>
    </>
  );
};

export default RoutineCreateUpdate;
