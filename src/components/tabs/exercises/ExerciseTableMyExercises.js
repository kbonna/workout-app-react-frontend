import React, { useState, useEffect, useContext } from "react";

import Spinner from "icons/Spinner";
import ExerciseTableHeader from "./ExerciseTableHeader";
import ExerciseTableBody from "./ExerciseTableBody";
import ExerciseTableFooter from "./ExerciseTableFooter";
import ExerciseTableError from "./ExerciseTableError";
import "./ExerciseTable.scss";

import { UserContext } from "components/App";
import { getPaginatedRange, filterPropertyWithString } from "utilities/misc";
import { fetchExercises, deleteExercise } from "services/Exercises";

/**
 * State:
 *  exercises:
 *    Array representing fetched list of exercises. In case of fetching single
 *    exercise using detail endpoint, array will contain single element. Empty
 *    array represents cases in which exercises were not found (due to either
 *    incorrectly requesting non existing resource or in the case when user did
 *    not defined or forked any exercises yet). During fetching, exercises is
 *    null to inform child compontents that they should render loaders instead
 *    of missing resources information.
 */
function ExerciseTableMyExercises({
  exercisesFilterString,
  nExercisesPerPage,
}) {
  const [exercises, setExercises] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { userId } = useContext(UserContext);

  const fetchData = () => {
    if (userId) {
      fetchExercises(userId).then((exercises) => {
        if (exercises.length) {
          setExercises(exercises);
        } else {
          setExercises([]);
        }
      });
    }
  };

  // TODO: Do I need userId in every useEffect???
  useEffect(fetchData, [userId]);

  function handleDelete(exerciseId) {
    deleteExercise(exerciseId).then((success) => {
      if (success) {
        setExercises((prevExercises) =>
          prevExercises.filter((exercise) => exercise.pk !== exerciseId)
        );
      }
    });
  }

  function handleEdit(exerciseId) {
    console.log(`editing exercise ${exerciseId}`);
  }

  if (exercises === null) {
    return (
      <div className="exercise-table__spinner-wrapper">
        <Spinner></Spinner>
      </div>
    );
  } else if (!exercises.length) {
    return <ExerciseTableError></ExerciseTableError>;
  } else {
    const [firstExerciseIndex, lastExerciseIndex] = getPaginatedRange(
      currentPage,
      nExercisesPerPage,
      exercises.length
    );
    const nPages = Math.ceil(exercises.length / nExercisesPerPage);
    return (
      <table className="exercise-table">
        <ExerciseTableHeader
          columnNames={["Name", "Type", null]}
        ></ExerciseTableHeader>
        <ExerciseTableBody
          exercises={exercises
            .filter(filterPropertyWithString(exercisesFilterString, "name"))
            .slice(firstExerciseIndex, lastExerciseIndex)}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        ></ExerciseTableBody>
        <ExerciseTableFooter
          currentPage={currentPage}
          nPages={nPages}
          decrementPage={() => decrementPage(currentPage, setCurrentPage)}
          incrementPage={() =>
            incrementPage(currentPage, setCurrentPage, nPages)
          }
          nExercises={exercises.length}
          firstExerciseIndex={firstExerciseIndex}
          lastExerciseIndex={lastExerciseIndex}
          nColumns={3}
        ></ExerciseTableFooter>
      </table>
    );
  }
}

const decrementPage = (currentPage, setCurrentPage) => {
  if (currentPage > 1) {
    setCurrentPage((prevPage) => prevPage - 1);
  }
};

const incrementPage = (currentPage, setCurrentPage, nPages) => {
  if (currentPage < nPages) {
    setCurrentPage((prevPage) => prevPage + 1);
  }
};

export default ExerciseTableMyExercises;

ExerciseTableMyExercises.defaultProps = {
  nExercisesPerPage: 7,
};
