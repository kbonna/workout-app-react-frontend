import React, { useState } from "react";
import ExerciseTableRow from "./ExerciseTableRow";
import "./ExerciseTable.scss";

const EXERCISES_PER_PAGE = 7;

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

  // variables derived from state
  const nExercises = exercises.length;
  const nPages = Math.ceil(nExercises / EXERCISES_PER_PAGE);

  const firstExerciseIndex = (currentPage - 1) * EXERCISES_PER_PAGE;
  let lastExerciseIndex = currentPage * EXERCISES_PER_PAGE;
  if (lastExerciseIndex + 1 > nExercises) {
    lastExerciseIndex = nExercises;
  }

  const exercisesToShow = exercises.slice(
    firstExerciseIndex,
    lastExerciseIndex
  );

  const exercisesToShowInfo = `${
    firstExerciseIndex + 1
  }-${lastExerciseIndex} out of ${exercises.length} exercises`;

  return exercises.length ? (
    <table className="exercise-table">
      <thead>
        <tr className="exercise-table__header-row">
          <th className="exercise-table__header-cell">Name</th>
          <th className="exercise-table__header-cell">Type</th>
          <th className="exercise-table__header-cell"></th>
        </tr>
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
        <tr className="exercise-table__footer-row">
          <th className="exercise-table__footer-cell">
            <div className="exercise-table__nav">
              <button
                className="exercise-table__nav-btn"
                onClick={decrementPage}
              >
                {"<"}
              </button>
              <p>
                {exerciseTableNavDigits(
                  currentPage,
                  nPages,
                  "exercise-table__nav-regular-digit",
                  "exercise-table__nav-currentpage-digit",
                  "exercise-table__nav-dots"
                )}
              </p>
              <button
                className="exercise-table__nav-btn"
                onClick={incrementPage}
              >
                {">"}
              </button>
            </div>
          </th>
          <th className="exercise-table__footer-cell"></th>
          <th className="exercise-table__footer-cell">{exercisesToShowInfo}</th>
        </tr>
      </tfoot>
    </table>
  ) : (
    <div className="exercise-table__error">No exercises found.</div>
  );
}

function exerciseTableNavDigits(
  currentPage,
  nPages,
  regularDigitClassName,
  currentPageDigitClassName,
  dotsClassName
) {
  let pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  // remove pages in between
  pageNumbers = pageNumbers.filter((pageNumber) =>
    pageNumber === 1 ||
    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) ||
    pageNumber === nPages
      ? true
      : false
  );

  // insert dots
  if (nPages > 3) {
    if (pageNumbers[1] !== pageNumbers[0] + 1) {
      pageNumbers.splice(1, 0, "...");
    }
    if (
      pageNumbers[pageNumbers.length - 1] !==
      pageNumbers[pageNumbers.length - 2] + 1
    )
      pageNumbers.splice(pageNumbers.length - 1, 0, "...");
  }

  // wrap all pages in spans
  pageNumbers = pageNumbers.map((pageNumber, idx) => {
    let className;
    let key;
    if (pageNumber === "...") {
      className = dotsClassName;
      key = `exercise-table-nav-item-dots-${idx}`;
    } else if (pageNumber === currentPage) {
      className = currentPageDigitClassName;
      key = `exercise-table-nav-item-page-${pageNumber}`;
    } else {
      className = regularDigitClassName;
      key = `exercise-table-nav-item-page-${pageNumber}`;
    }
    return (
      <span key={key} className={className}>
        {pageNumber}
      </span>
    );
  });

  return pageNumbers;
}

export default ExerciseTable;
