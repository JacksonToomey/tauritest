import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";

import { DBProvider } from "./hooks/db";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <DBProvider>
        <App />
      </DBProvider>
    </HashRouter>
  </React.StrictMode>
);
