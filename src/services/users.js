import { header_with_token } from "./auth";
import routes from "utilities/routes";

const DEFAULT_PROFILE_PICTURE_URL = "/media/profile_pictures/default.png";

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

const updateUserProfilePicture = async (userPk, imageData) => {
  const response = await fetch(`${routes.api.users.self}${userPk}/profile-picture`, {
    method: "PUT",
    headers: header_with_token(),
    body: imageData,
  });
  const json = await response.json();
  if (response.ok) {
    return Promise.resolve(json);
  }
  return Promise.reject(json);
};

const deleteUserProfilePicture = async (userPk) => {
  const response = await fetch(`${routes.api.users.self}${userPk}/profile-picture`, {
    method: "DELETE",
    headers: header_with_token(),
  });
  if (response.ok) {
    return Promise.resolve();
  }
  return Promise.reject();
};

const updateUserProfile = async (userData, userPk) => {
  const response = await fetch(`${routes.api.users.self}${userPk}`, {
    method: "PUT",
    headers: { ...header_with_token(), "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const json = await response.json();
  if (response.ok) {
    return Promise.resolve(json);
  }
  return Promise.reject(json);
};

export {
  fetchUser,
  updateUserProfile,
  updateUserPassword,
  updateUserEmail,
  updateUserProfilePicture,
  deleteUserProfilePicture,
  DEFAULT_PROFILE_PICTURE_URL,
};
