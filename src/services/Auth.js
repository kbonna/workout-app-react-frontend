import { BASE_URL, API_URL } from "utilities/routes";

/**
 * Login function using JWT authorization endpoint.
 *
 * If login is successful it saves both access and refresh token in local
 * storage and resolves without any value.
 *
 * If login is unsuccessfull it rejects with an error containing meaningful
 * message.
 *
 * @param {string} username
 * @param {string} password
 */
export async function loginUser(username, password) {
  const response = await fetch(`${BASE_URL}/token-auth/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  if (response.ok) {
    const json = await response.json();
    localStorage.setItem("token-access", json.access);
    localStorage.setItem("token-refresh", json.refresh);
    return;
  } else {
    throw new Error("Incorrect username or password");
  }
}

/**
 * Signup function trying to create new user using users list endpoint.
 *
 * If new user is created it resolves without any value.
 *
 * If new user cannot be created it rejects with an error message read from
 * backend response.
 *
 * @param {string} username
 * @param {string} password
 */
export async function signupUser(username, password) {
  const response = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  if (response.status !== 201) {
    const json = await response.json();
    throw new Error(json.username[0]); // TODO: this is too specific, may lead to bugs later
  }
}

/**
 * Reach current user endpoint to retrieve information about current user. It 
 * uses JWT saved in local storage to authenticate.
 * 
 * If there is no access token available or token is invalit it rejects with an 
 * error with meaningful error message.
 * 
 * If the token is valid it resolves with an user object. 
 * 
 * User object has fields:
 *  pk: 
 *    User database id.
 *  username: 
      User username.
 */
export async function currentUser() {
  if (localStorage.getItem("token-access")) {
    const response = await fetch(`${API_URL}/current_user`, {
      headers: header_with_token(),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Unauthorized");
    }
  } else {
    throw new Error("No access token found");
  }
}

/**
 * Create authorization JWT header for all client-to-server requests.
 */
export function header_with_token() {
  return {
    Authorization: `Bearer ${localStorage.getItem("token-access")}`,
  };
}
