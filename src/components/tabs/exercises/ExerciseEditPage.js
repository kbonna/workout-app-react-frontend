import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { isEmpty } from "utilities/misc";
import { editExercise, fetchExercise } from "services/Exercises";

import { UserContext } from "components/App";
import ExerciseForm from "./ExerciseForm";
import styles from "./ExerciseNewPage.module.scss";

function ExerciseEditPage() {
  const [formData, setFormData] = useState(null);
  const { userId } = useContext(UserContext);
  const { id: exerciseId } = useParams();
  const history = useHistory();

  const handleCancel = (e) => {
    history.goBack();
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

    editExercise(data, exerciseId).then((result) => {
      console.log(result);
    });
  };

  const fetchData = () => {
    if (userId) {
      fetchExercise(exerciseId).then((exercise) => {
        if (isEmpty(exercise)) {
          console.log("404!"); // TODO: redirect to 404
        } else {
          setFormData({
            name: { value: exercise.name, error: "" },
            kind: { value: exercise.kind, error: "" },
            instructions: { value: exercise.instructions, error: "" },
            tags: { value: exercise.tags.map((tag) => tag.name), error: [] },
            muscles: {
              value: exercise.muscles.map((muscle) => muscle.name),
              error: [],
            },
            tutorials: {
              value: exercise.tutorials.map((tutorial) => tutorial.url),
              error: [],
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
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        ></ExerciseForm>
      )}
    </>
  );
}

export default ExerciseEditPage;
