import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { CenterContent } from "./ui";
import { Spin } from "antd";
import "./i18n.ts";
import "./index.css";

const fallBack = (
  <CenterContent>
    <Spin tip="Loading..." />
  </CenterContent>
);

const Main = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={fallBack}>
        <App />
      </Suspense>
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(<Main />, document.getElementById("app"));
