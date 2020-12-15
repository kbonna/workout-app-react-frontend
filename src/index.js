import React from "react";
import ReactDOM from "react-dom";
import AppProviders from "components/context/AppProviders";
import App from "./components/App";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
