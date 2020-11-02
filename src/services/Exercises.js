import { header_with_token } from "./Auth";

/**
 * Returns all exercise owned by the user. In case of error in response, empty
 * array is returned.
 *
 * @param {string} endpoint_url - URL of exercises list.
 * @param {number} userId - User primary key.
 * @param {boolean} discover - Determines if querystring should include discover
 * flag.
 */
export const fetchExercises = async function (
  endpoint_url,
  userId,
  discover = false
) {
  const response = await fetch(
    `${endpoint_url}/?user=${userId}${discover ? "&discover=True" : ""}`,
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
 * Returns exercise object wrapped in array or empty array if exercise is not
 * found.
 *
 * @param {string} api_url - REST API url.
 * @param {number} exerciseId - Exercise primary key.
 */
export const fetchExercise = async function (api_url, exerciseId) {
  const response = await fetch(`${api_url}/exercises/${exerciseId}`, {
    headers: header_with_token(),
  });
  if (response.status !== 200) {
    return {};
  }
  return await response.json();
};
