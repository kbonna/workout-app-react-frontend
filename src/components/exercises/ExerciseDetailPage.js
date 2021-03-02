import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { isEmpty } from "utilities/misc";
import { fetchExercise, deleteExercise, forkExercise } from "services/exercises";

import ExerciseDetailHeader from "./ExerciseDetailHeader";
import ExerciseDetailButtons from "./ExerciseDetailButtons";
import ExerciseDetailParagraph from "./ExerciseDetailParagraph";
import MuscleDiagram from "components/reusable/MuscleDiagram";
import Spinner from "components/reusable/Spinner";
import styles from "./ExerciseDetailPage.module.scss";
import routes from "utilities/routes";

import { useNotify } from "context/NotificationProvider";
import GoBack from "components/reusable/GoBack";
import ExerciseListInfo from "./ExerciseListInfo";

function ExerciseDetailPage() {
  const [exercise, setExercise] = useState(null);
  const { id: exerciseId } = useParams();
  const history = useHistory();
  const notify = useNotify();

  const fetchData = () => {
    fetchExercise(exerciseId).then((exercise) => {
      if (isEmpty(exercise)) {
        history.push(routes.notFound);
      } else {
        setExercise(exercise);
      }
    });
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

  useEffect(fetchData, []);

  let exerciseDetailPageContent;
  if (exercise === null) {
    exerciseDetailPageContent = (
      <div className={styles["spinner-wrapped"]}>
        <Spinner></Spinner>
      </div>
    );
  } else {
    exerciseDetailPageContent = (
      <>
        <GoBack history={history}></GoBack>
        <div className={styles["page"]}>
          <div className={styles["content"]}>
            <div className={styles["content__info"]}>
              <ExerciseDetailHeader
                exerciseName={exercise.name}
                exerciseKind={exercise.kind_display}
              ></ExerciseDetailHeader>
              <MuscleDiagram
                muscles={Object.fromEntries(exercise.muscles.map((muscle) => [muscle.name, 3]))}
              ></MuscleDiagram>
              <ExerciseListInfo exercise={exercise}></ExerciseListInfo>
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
      </>
    );
  }

  return exerciseDetailPageContent;
}

export default ExerciseDetailPage;
