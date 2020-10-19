import { BASE_URL, API_URL } from "../components/App";

export function login(username, password) {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/token-auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.hasOwnProperty("token")) {
          localStorage.setItem("token", json.token);
          resolve(json.user.pk);
        } else {
          reject("Incorrect username or password");
        }
      });
  });
}

export function signup(username, password) {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    }).then((res) => {
      if (res.status === 201) {
        res.json().then((json) => {
          localStorage.setItem("token", json.token);
          resolve(json.userId);
        });
      } else {
        res.json().then((json) => {
          reject(json.username[0]);
        });
      }
    });
  });
}

export function header_with_token() {
  return {
    Authorization: `JWT ${localStorage.getItem("token")}`,
  };
}
