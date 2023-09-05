import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/primeicons/primeicons.css";
import "../node_modules/primeflex/primeflex.css";
import "../node_modules/primereact/resources/themes/md-light-indigo/theme.css";
import "../node_modules/primereact/resources/primereact.css";
import "./index.css";
import App from "./App";
import { store } from "./redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
