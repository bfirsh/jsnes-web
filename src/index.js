import Raven from "raven-js";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import config from "./config";
import "./index.css";

if (config.SENTRY_URI) {
  Raven.config(config.SENTRY_URI).install();
}

Raven.context(function() {
  ReactDOM.render(<App />, document.getElementById("root"));
});
