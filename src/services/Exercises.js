import { header_with_token } from "./Auth";
import routes from "utilities/routes";

/**
 * Returns all exercise owned by the user. In case of error in response, empty
 * array is returned.
 *
 * @param {number} userId - User primary key.
 * @param {boolean} discover - Determines if querystring should include discover
 * flag.
 */
export const fetchExercises = async function (userId, discover = false) {
  const response = await fetch(
    `${routes.api.exercises.self}?user=${userId}${
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
