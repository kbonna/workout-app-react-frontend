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

export { fetchUser };
