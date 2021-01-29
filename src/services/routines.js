import { header_with_token } from "./auth";
import routes from "utilities/routes";

/**
 * Returns all routines owned by the user. In case of error in response, empty
 * array is returned.
 *
 * @param {number} userPk - User primary key.
 * @param {boolean} discover - Determines if querystring should include discover
 * flag.
 */
const fetchRoutines = async (userPk, discover = false) => {
  const response = await fetch(
    `${routes.api.routines.self}?user=${userPk}${
      discover ? "&discover=True" : ""
    }`,
    {
      headers: header_with_token(),
    }
  );
  if (response.status !== 200) {
    return [];
  }
  const routines = await response.json();
  return routines;
};

/**
 * Get information about specific routine. If routine cannot be accessed or is not found promise
 * will be rejected.
 *
 * @param {number} routineId - Routine primary key.
 */
const fetchRoutine = async (routineId) => {
  const response = await fetch(`${routes.api.routines.self}${routineId}`, {
    headers: header_with_token(),
  });
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  return Promise.reject(json);
};

const forkRoutine = async (routineId) => {
  const response = await fetch(`${routes.api.routines.self}${routineId}`, {
    method: "POST",
    headers: header_with_token(),
  });
  const json = await response.json();
  if (response.status === 201) {
    return json;
  } else {
    return Promise.reject(json);
  }
};

const deleteRoutine = async (routineId) => {
  const response = await fetch(`${routes.api.routines.self}${routineId}`, {
    method: "DELETE",
    headers: header_with_token(),
  });
  if (response.status === 204) {
    return Promise.resolve();
  }
  return Promise.reject();
};

export { fetchRoutine, fetchRoutines, forkRoutine, deleteRoutine };
