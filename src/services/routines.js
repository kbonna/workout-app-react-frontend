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

/**
 * Create new routine.
 *
 * @param {object} data - Object containing routine data.
 *
 * Either resolves with newly created routine object or rejects with error messages for incorrect
 * fields.
 */
const createRoutine = async (data) => {
  const response = await fetch(routes.api.routines.self, {
    method: "POST",
    headers: { ...header_with_token(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (response.status === 201) {
    return Promise.resolve(json);
  }
  return Promise.reject(json);
};

/**
 * Edit users routine.
 *
 * @param {object} data - Routine data.
 * @param {number} routinePk - Primary key of updated routine.
 *
 * Either resolves with succesfully updated routine object or rejects with error messages for
 * incorrect fields.
 */
const updateRoutine = async function (data, routinePk) {
  const response = await fetch(`${routes.api.routines.self}${routinePk}`, {
    method: "PUT",
    headers: { ...header_with_token(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (response.status === 200) {
    return Promise.resolve(json);
  }
  return Promise.reject(json);
};

export {
  fetchRoutine,
  fetchRoutines,
  forkRoutine,
  createRoutine,
  updateRoutine,
  deleteRoutine,
};
