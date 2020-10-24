import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

import ExerciseTableHeader from "./ExerciseTableHeader";
import ExerciseTableRow from "./ExerciseTableRow";
import ExerciseTableFooter from "./ExerciseTableFooter";
import "./ExerciseTable.scss";

export const EXERCISES_PER_PAGE = 7;

function ExerciseTable({ exercises, handleEdit, handleDelete, handleFork }) {
  const [currentPage, setCurrentPage] = useState(1);
  const isDiscover = typeof handleFork !== "undefined" ? true : false;
  const { url } = useRouteMatch();

  useEffect(() => {
    setCurrentPage(1);
  }, [url]);

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

  return (
    <table className="exercise-table">
      <thead>
        <ExerciseTableHeader isDiscover={isDiscover}></ExerciseTableHeader>
      </thead>
      <tbody>
        {exercisesToShow.map((exercise, idx) => (
          <ExerciseTableRow
            key={exercise.pk}
            exercise={exercise}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleFork={handleFork}
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
          isDiscover={isDiscover}
        ></ExerciseTableFooter>
      </tfoot>
    </table>
  );
}

export default ExerciseTable;

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
