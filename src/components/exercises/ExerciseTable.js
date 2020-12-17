import React, { useState, useEffect } from "react";

import Spinner from "components/icons/Spinner";
import ExerciseTableHeader from "./ExerciseTableHeader";
import ExerciseTableBody from "./ExerciseTableBody";
import ExerciseTableFooter from "./ExerciseTableFooter";
import ExerciseTableError from "./ExerciseTableError";
import styles from "./ExerciseTable.module.scss";

import { getPaginatedRange, filterPropertyWithString } from "utilities/misc";

/**
 *  exercises:
 *    Array representing fetched list of exercises. In case of fetching single
 *    exercise using detail endpoint, array will contain single element. Empty
 *    array represents cases in which exercises were not found (due to either
 *    incorrectly requesting non existing resource or in the case when user did
 *    not defined or forked any exercises yet). During fetching, exercises is
 *    null to inform child compontents that they should render loaders instead
 *    of missing resources information.
 */
function ExerciseTable({
  columnNames,
  exercises,
  exercisesButtons,
  exercisesExtraColumns,
  exercisesFilterString,
  nExercisesPerPage,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => setCurrentPage(1), [exercisesFilterString]);

  if (exercises === null) {
    return (
      <div className={styles["spinner-wrapper"]}>
        <Spinner></Spinner>
      </div>
    );
  } else if (!exercises.length) {
    return <ExerciseTableError></ExerciseTableError>;
  } else {
    const exercisesFiltered = exercises.filter(
      filterPropertyWithString(exercisesFilterString, "name")
    );
    const [firstIdx, lastIdx, nPages] = getPaginatedRange(
      currentPage,
      nExercisesPerPage,
      exercisesFiltered.length
    );
    const exercisesPaginated = exercisesFiltered.slice(firstIdx, lastIdx);
    const exercisesButtonsPaginated = exercisesButtons.slice(firstIdx, lastIdx);
    const exercisesExtraColumnsPaginated = exercisesExtraColumns
      ? exercisesExtraColumns.slice(firstIdx, lastIdx)
      : exercisesExtraColumns;

    return (
      <table className={styles["table"]}>
        <ExerciseTableHeader columnNames={columnNames}></ExerciseTableHeader>
        <ExerciseTableBody
          exercises={exercisesPaginated}
          exercisesButtons={exercisesButtonsPaginated}
          exercisesExtraColumns={exercisesExtraColumnsPaginated}
        ></ExerciseTableBody>
        <ExerciseTableFooter
          currentPage={currentPage}
          nPages={nPages}
          decrementPage={() => decrementPage(currentPage, setCurrentPage)}
          incrementPage={() =>
            incrementPage(currentPage, setCurrentPage, nPages)
          }
          nExercises={exercises.length}
          firstExerciseIndex={firstIdx}
          lastExerciseIndex={lastIdx}
          nColumns={columnNames.length}
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

export default ExerciseTable;

ExerciseTable.defaultProps = {
  nExercisesPerPage: 7,
  exercisesExtraColumns: null,
};
