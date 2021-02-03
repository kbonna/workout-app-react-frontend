import React, { useState, useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import { fetchRoutine, updateRoutine } from "services/routines";
import routes from "utilities/routes";
import { formReducer, FORM_ACTIONS, validateForm } from "reducers/form";
import {
  formDataFromRoutine,
  formDataInitial,
  fieldProps,
} from "forms/routine";
import { ROUTINE_ACTIONS } from "./Routines";
import RoutineForm from "./RoutineForm";
import { fetchExercises } from "services/exercises";
import { useUser } from "context/UserProvider";
import CenteredSpinner from "components/reusable/CenteredSpinner";
import { useNotify } from "context/NotificationProvider";
import { createRoutine } from "services/routines";
import Header from "components/reusable/Header";

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

  const fetchAvailableExercisesData = () => {
    fetchExercises(user.pk)
      .then((availableExercises) => {
        // ! remove later, only for testing purpose
        availableExercises.push({
          pk: 999,
          name: "fake exercise",
          kind: "ep",
        });
        setAvailableExercises(availableExercises);
      })
      .catch(() => {
        history.push(routes.notFound);
      });
  };

  const fetchRoutineData = () => {
    fetchRoutine(routineId)
      .then((routine) => {
        if (!routine.can_be_modified) {
          history.push(routes.forbidden);
        } else {
          dispatch({
            type: FORM_ACTIONS.SET_STATE,
            state: formDataFromRoutine(routine),
          });
        }
      })
      .catch(() => {
        history.push(routes.notFound);
      });
  };

  const fetchData = () => {
    if (action === ROUTINE_ACTIONS.CREATE) {
      dispatch({ type: FORM_ACTIONS.SET_STATE, state: formDataInitial });
      fetchAvailableExercisesData();
    } else if (action === ROUTINE_ACTIONS.UPDATE) {
      fetchRoutineData();
      fetchAvailableExercisesData();
    }
  };

  useEffect(fetchData, []);

  return (formData === null) | (availableExercises === null) ? (
    <CenteredSpinner></CenteredSpinner>
  ) : (
    <>
      <Header>{`${action} routine`}</Header>
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
