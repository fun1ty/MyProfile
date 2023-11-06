import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { RouterProvider } from "react-router-dom";
import store from "./store/toolkitStore";
import "./index.css";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  </React.StrictMode>
);
