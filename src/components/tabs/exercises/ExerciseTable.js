import React, { useState } from "react";
import "./ExerciseTable.scss";
import ExerciseTableHeader from "./ExerciseTableHeader";
import ExerciseTableRow from "./ExerciseTableRow";
import ExerciseTableFooter from "./ExerciseTableFooter";
import ExerciseTableError from "./ExerciseTableError";

export const EXERCISES_PER_PAGE = 7;

function ExerciseTable({ exercises }) {
  const [currentPage, setCurrentPage] = useState(1);

  // functions
  const decrementPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const incrementPage = () => {
    if (currentPage < nPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // variables derived from state & props
  const nExercises = exercises.length;
  const nPages = Math.ceil(nExercises / EXERCISES_PER_PAGE);
  const [firstExerciseIndex, lastExerciseIndex] = getPaginatedRange(
    currentPage,
    EXERCISES_PER_PAGE,
    nExercises
  );

  const exercisesToShow = exercises.slice(
    firstExerciseIndex,
    lastExerciseIndex
  );

  return exercises.length ? (
    <table className="exercise-table">
      <thead>
        <ExerciseTableHeader></ExerciseTableHeader>
      </thead>
      <tbody>
        {exercisesToShow.map((exercise, idx) => (
          <ExerciseTableRow
            key={exercise.pk}
            exercise={exercise}
          ></ExerciseTableRow>
        ))}
      </tbody>
      <tfoot>
        <ExerciseTableFooter
          currentPage={currentPage}
          nPages={nPages}
          decrementPage={decrementPage}
          incrementPage={incrementPage}
          nExercises={nExercises}
        ></ExerciseTableFooter>
      </tfoot>
    </table>
  ) : (
    <ExerciseTableError></ExerciseTableError>
  );
}

/**
 * Let's assume that we have array of nItems items that we want to divide into
 * pages containing nItemsPerPage items per page. This function returns first
 * and last index of array slice (subarray) that contains all items for page
 * with number currentPage.
 *
 * @param {number} currentPage - Current page number.
 * @param {number} itemsPerPage - Number of items per page.
 * @param {number} nItems - Total number of items in a collection.
 */
export const getPaginatedRange = (currentPage, nItemsPerPage, nItems) => {
  const firstItemIndex = (currentPage - 1) * nItemsPerPage;
  const lastItemIndex =
    currentPage * nItemsPerPage + 1 > nItems
      ? nItems
      : currentPage * nItemsPerPage;
  return [firstItemIndex, lastItemIndex];
};

export default ExerciseTable;
