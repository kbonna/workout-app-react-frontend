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
    `${routes.api.exercises.self}/?user=${userId}${
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
  const response = await fetch(`${routes.api.exercises.self}/${exerciseId}`, {
    headers: header_with_token(),
  });
  if (response.status !== 200) {
    return {};
  }
  return await response.json();
};

/**
 * Delete exercise object.
 *
 * Returns true if delete is successful and false otherwise.
 *
 * @param {number} exerciseId
 */
export const deleteExercise = async function (exerciseId) {
  const response = await fetch(`${routes.api.exercises.self}/${exerciseId}`, {
    method: "delete",
    headers: header_with_token(),
  });
  if (response.status === 204) {
    return true;
  }
  return false;
};
