import { header_with_token } from "./auth";
import routes from "utilities/routes";

const fetchUser = async (userPk) => {
  const response = await fetch(`${routes.api.users.self}${userPk}`, {
    headers: header_with_token(),
  });
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  return Promise.reject(json);
};

const updateUserPassword = async (userPk, password) => {
  const response = await fetch(`${routes.api.users.self}${userPk}/password-reset`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...header_with_token(),
    },
    body: JSON.stringify({ password }),
  });
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  return Promise.reject(json);
};

const updateUserEmail = async (userPk, email) => {
  const response = await fetch(`${routes.api.users.self}${userPk}/email-reset`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...header_with_token(),
    },
    body: JSON.stringify({ email }),
  });
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  return Promise.reject(json);
};

export { fetchUser, updateUserPassword, updateUserEmail };
