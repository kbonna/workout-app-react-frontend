import { header_with_token } from "./auth";
import routes from "utilities/routes";

/**
 * Returns all exercise owned by the user. In case of error in response, empty
 * array is returned.
 *
 * @param {number} userPk - User primary key.
 * @param {boolean} discover - Determines if querystring should include discover
 * flag.
 */
export const fetchExercises = async function (userPk, discover = false) {
  const response = await fetch(
    `${routes.api.exercises.self}?user=${userPk}${
      discover ? "&discover=True" : ""
    }`,
    {
      headers: header_with_token(),
    }
  );
  if (response.status !== 200) {
    return [];
  }
  const exercises = await response.json();
  return exercises;
};

/**
 * Fetch exercise object with detailed information.
 *
 * @param {number} exerciseId - Exercise primary key.
 */
export const fetchExercise = async function (exerciseId) {
  const response = await fetch(`${routes.api.exercises.self}${exerciseId}`, {
    headers: header_with_token(),
  });
  if (response.status !== 200) {
    return {};
  }
  const exercise = await response.json();
  return exercise;
};

/**
 * Delete exercise object.
 *
 * Returns true if delete is successful and false otherwise.
 *
 * @param {number} exerciseId
 */
export const deleteExercise = async function (exerciseId) {
  const response = await fetch(`${routes.api.exercises.self}${exerciseId}`, {
    method: "delete",
    headers: header_with_token(),
  });
  if (response.status === 204) {
    return true;
  }
  return false;
};

/**
 * Create new exercise.
 *
 * @param {object} data - Object containing exercise data.
 *
 * Returns array of two elements: first is the decision if creation was
 * successful, second is the associated object. If new instance was created
 * this object contains validated data, otherwise it cointains error messages
 * for incorrect fields.
 */
export const createExercise = async function (data) {
  const response = await fetch(routes.api.exercises.self, {
    method: "post",
    headers: { ...header_with_token(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (response.status === 201) {
    return [true, json];
  }
  return [false, json];
};

/**
 * Edit exercise using specified data.
 *
 * @param {object} data - Object containing exercise data.
 * @param {number} exerciseId
 *
 * Returns array of two elements: first is the decision if creation was
 * successful, second is the associated object. If new instance was created
 * this object contains validated data, otherwise it cointains error messages
 * for incorrect fields.
 */
export const editExercise = async function (data, exerciseId) {
  const response = await fetch(`${routes.api.exercises.self}${exerciseId}`, {
    method: "put",
    headers: { ...header_with_token(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (response.status === 200) {
    return [true, json];
  }
  return [false, json];
};

/**
 * Create a perfect copy of certain exercise and attach it to user that made request. It should fail
 * whenever user already have exercise with same name.
 *
 * @param {number} exerciseId - Exercise primary key.
 */
export const forkExercise = async function (exerciseId) {
  const response = await fetch(`${routes.api.exercises.self}${exerciseId}`, {
    method: "post",
    headers: header_with_token(),
  });
  const json = await response.json();
  if (response.status === 201) {
    return [true, json];
  }
  return [false, json];
};
