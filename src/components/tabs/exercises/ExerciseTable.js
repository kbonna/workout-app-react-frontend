import React, { useState, useEffect, useContext } from "react";

import ExerciseTableHeader from "./ExerciseTableHeader";
import ExerciseTableRow from "./ExerciseTableRow";
import ExerciseTableFooter from "./ExerciseTableFooter";
import ExerciseTableError from "./ExerciseTableError";
import "./ExerciseTable.scss";
import Spinner from "icons/Spinner";

import { UserContext, API_URL } from "components/App";
import { header_with_token } from "services/Auth";
import { useLocation } from "react-router-dom";
import { fetchExercises } from "services/Exercises";
import { stripCurrentPath } from "utilities/misc";

export const EXERCISES_PER_PAGE = 7;

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
function ExerciseTable({ exercisesFilterString }) {
  const [exercises, setExercises] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { userId } = useContext(UserContext);

  const location = useLocation();
  const isDiscover = stripCurrentPath(location.pathname) === "discover";

  console.log("rendering...", exercises === null ? null : exercises.length);

  const fetchData = () => {
    // sleep(100);

    if (userId) {
      let fetchExercisesPromise;
      if (stripCurrentPath(location.pathname) === "my-exercises") {
        fetchExercisesPromise = fetchExercises(API_URL, userId);
      } else if (stripCurrentPath(location.pathname) === "discover") {
        fetchExercisesPromise = fetchExercises(API_URL, userId, true);
      }
      fetchExercisesPromise.then((exercises) => {
        if (exercises.length) {
          setExercises(exercises);
          setCurrentPage(1);
        } else {
          setExercises([]);
        }
      });
    }
    return () => {
      console.log("cleanup...");
      setExercises(null);
    };
  };

  useEffect(fetchData, [location.pathname, userId]);

  // TODO: move into servives
  function handleDelete(exerciseId) {
    fetch(`${API_URL}/exercises/${exerciseId}`, {
      method: "delete",
      headers: header_with_token(),
    }).then((res) => {
      if (res.status === 204) {
        setExercises((prevExercises) =>
          prevExercises.filter((exercise) => exercise.pk !== exerciseId)
        );
      }
    });
  }

  function handleEdit(exerciseId) {
    console.log(`editing exercise ${exerciseId}`);
  }

  function handleFork(exerciseId) {
    fetch(`${API_URL}/exercises/${exerciseId}`, {
      method: "post",
      headers: header_with_token(),
    }).then((res) => {
      console.log(res);
    });
  }

  // functions
  const decrementPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const incrementPage = () => {
    if (currentPage < Math.ceil(exercises.length / EXERCISES_PER_PAGE)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  if (exercises === null) {
    return (
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <Spinner></Spinner>
      </div>
    );
  } else if (!exercises.length) {
    return <ExerciseTableError></ExerciseTableError>;
  } else {
    const [firstExerciseIndex, lastExerciseIndex] = getPaginatedRange(
      currentPage,
      EXERCISES_PER_PAGE,
      exercises.length
    );

    const actionHandlers = isDiscover
      ? { handleFork: handleFork }
      : { handleDelete: handleDelete, handleEdit: handleEdit };

    return (
      <table className="exercise-table">
        <thead>
          <ExerciseTableHeader isDiscover={isDiscover}></ExerciseTableHeader>
        </thead>
        <tbody>
          {exercises
            .filter(filterPropertyWithString(exercisesFilterString, "name"))
            .slice(firstExerciseIndex, lastExerciseIndex)
            .map((exercise, idx) => (
              <ExerciseTableRow
                key={exercise.pk}
                exercise={exercise}
                {...actionHandlers}
              ></ExerciseTableRow>
            ))}
        </tbody>
        <tfoot>
          <ExerciseTableFooter
            currentPage={currentPage}
            nPages={Math.ceil(exercises.length / EXERCISES_PER_PAGE)}
            decrementPage={decrementPage}
            incrementPage={incrementPage}
            nExercises={exercises.length}
            isDiscover={isDiscover}
          ></ExerciseTableFooter>
        </tfoot>
      </table>
    );
  }
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

/**
 *
 * @param {string} filterString - Filter string.
 * @param {string} property - Object property name.
 */
const filterPropertyWithString = (filterString, property) => (obj) =>
  obj[property].includes(filterString);

/**
 *
 * @param {*} miliseconds
 */
function sleep(miliseconds) {
  var currentTime = new Date().getTime();
  while (currentTime + miliseconds >= new Date().getTime()) {}
}
