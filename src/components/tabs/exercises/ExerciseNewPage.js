import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { createExercise } from "services/Exercises";
import ExerciseForm from "./ExerciseForm";
import styles from "./ExerciseNewPage.module.scss";

const initialStateString = { value: "", error: "" };
const initialStateArray = { value: [], error: [] };

function ExerciseNewPage() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: initialStateString,
    kind: initialStateString,
    instructions: initialStateString,
    tags: initialStateArray,
    muscles: initialStateArray,
    tutorials: initialStateArray,
  });

  const handleCancel = (e) => {
    history.goBack();
  };

  /**
   * Set error messages for all inputs using component state.
   *
   * @param {object} errors – Error object parsed from JSON returned from
   * backend.
   */
  const setErrors = (errors) => {
    if ("non_field_errors" in errors) {
      (errors.name = errors.name || []).push(errors.non_field_errors.join(" "));
    }
    console.log(errors);
    for (const field of Object.keys(formData)) {
      let error;
      if (typeof formData[field].value === "string") {
        error = field in errors ? errors[field].join("") : "";
      } else {
        error =
          field in errors
            ? errors[field].map((obj) => Object.values(obj).join(" "))
            : [];
      }
      setFormData((prevState) => ({
        ...prevState,
        [field]: { ...prevState[field], error },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: formData.name.value,
      ...(formData.kind.value !== "" && { kind: formData.kind.value }),
      instructions: formData.instructions.value,
      tags: formData.tags.value.map((name) => ({ name })),
      muscles: formData.muscles.value.map((name) => ({ name })),
      tutorials: formData.tutorials.value.map((url) => ({ url })),
    };

    createExercise(data).then(([isCreated, json]) => {
      if (isCreated) {
        history.goBack();
      } else {
        setErrors(json);
      }
    });
  };

  return (
    <>
      <h1 className={styles.title}>New exercise</h1>
      <ExerciseForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      ></ExerciseForm>
    </>
  );
}

export default ExerciseNewPage;
