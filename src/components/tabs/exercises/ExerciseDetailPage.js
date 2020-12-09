import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import { UserContext } from "components/App";
import { isEmpty } from "utilities/misc";
import {
  fetchExercise,
  deleteExercise,
  forkExercise,
} from "services/Exercises";

import ExerciseDetailHeader from "./ExerciseDetailHeader";
import ExerciseDetailMuscleDiagram from "./ExerciseDetailMuscleDiagram";
import ExerciseDetailList from "./ExerciseDetailList";
import ExerciseDetailButtons from "./ExerciseDetailButtons";
import ExerciseDetailParagraph from "./ExerciseDetailParagraph";
import LeftArrow from "icons/LeftArrow";
import Spinner from "icons/Spinner";
import styles from "./ExerciseDetailPage.module.scss";
import { useNotification } from "components/context/NotificationProvider";
import routes from "utilities/routes";

function ExerciseDetailPage() {
  const [exercise, setExercise] = useState(null);
  const { userId } = useContext(UserContext);
  const { id: exerciseId } = useParams();
  const history = useHistory();
  const notify = useNotification();

  const handleReturn = (e) => {
    history.goBack();
  };

  const fetchData = () => {
    if (userId) {
      fetchExercise(exerciseId).then((exercise) => {
        if (isEmpty(exercise)) {
          setExercise({});
        } else {
          setExercise(exercise);
        }
      });
    }
  };

  function handleDelete(exercise) {
    deleteExercise(exercise.pk).then((success) => {
      if (success) {
        history.push(routes.app.exercises.myExercises);
        notify({
          message: `Successfully deleted ${exercise.name} exercise.`,
          type: "success",
        });
      }
    });
  }

  function handleFork(exercise) {
    forkExercise(exercise.pk).then(([success, updated_exercise]) => {
      console.log(updated_exercise);
      if (success) {
        setExercise(updated_exercise);
        notify({
          message: `Successfully forked ${exercise.name} exercise.`,
          type: "success",
        });
      } else {
        notify({
          message: `Cannot fork ${exercise.name} exercise.`,
          type: "error",
        });
      }
    });
  }

  useEffect(fetchData, [userId]);

  let exerciseDetailPageContent;
  if (exercise === null) {
    exerciseDetailPageContent = (
      <div className={styles["spinner-wrapped"]}>
        <Spinner></Spinner>
      </div>
    );
  } else if (isEmpty(exercise)) {
    exerciseDetailPageContent = <h1>404 Not Found</h1>;
  } else {
    exerciseDetailPageContent = (
      <div className={styles["page"]}>
        <LeftArrow onClick={handleReturn}></LeftArrow>
        <div className={styles["content"]}>
          <div className={styles["content__info"]}>
            <ExerciseDetailHeader
              exerciseName={exercise.name}
              exerciseKind={exercise.kind_display}
            ></ExerciseDetailHeader>
            <ExerciseDetailMuscleDiagram
              muscleList={exercise.muscles.map((muscle) => muscle.name)}
            ></ExerciseDetailMuscleDiagram>
            <ExerciseDetailList exercise={exercise}></ExerciseDetailList>
            <ExerciseDetailButtons
              exercise={exercise}
              handleDelete={() => {
                handleDelete(exercise);
              }}
              handleFork={() => {
                handleFork(exercise);
              }}
            ></ExerciseDetailButtons>
          </div>
          <div className={styles["content__more"]}>
            <ExerciseDetailParagraph
              title="Instructions"
              content={exercise.instructions}
            ></ExerciseDetailParagraph>
          </div>
        </div>
      </div>
    );
  }

  return exerciseDetailPageContent;
}

export default ExerciseDetailPage;
