export const BASE_URL = "http://localhost:8000";
export const API_URL = BASE_URL + "/api";

const routes = {
  app: {
    self: "/app",
    exercises: {
      self: "/exercises",
      myExercises: "/my-exercises",
      discover: "/discover",
      exercise: "/exercise",
      new: "/new",
    },
    routines: {
      self: "/routines",
      myRoutines: "/my-routines",
      discover: "/discover",
      routine: "/routine",
      new: "/new",
    },
    users: {
      self: "/users",
      user: "/user",
    },
    inbox: {
      self: "/inbox",
    },
    dashboard: {
      self: "/dashboard",
    },
    workouts: {
      self: "/workouts",
    },
    samples: {
      self: "/samples",
    },
    statistics: {
      self: "/statistics",
    },
  },
  api: {
    self: API_URL,
    exercises: {
      self: "/exercises",
    },
    routines: {
      self: "/routines",
    },
  },
  notFound: "/404",
  login: "/login",
  signup: "/signup",
};

const createFullRoutesRecursively = (obj, prevPath = "") => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      createFullRoutesRecursively(obj[key], prevPath + obj[key].self);
    } else {
      if (key === "self") {
        obj[key] = prevPath + "/";
      } else {
        obj[key] = prevPath + obj[key] + "/";
      }
    }
  });
};

createFullRoutesRecursively(routes);

export default routes;
