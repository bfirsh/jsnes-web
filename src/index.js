import Raven from "raven-js";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import config from "./config";
import "./index.scss";

if (config.SENTRY_URI) {
  Raven.config(config.SENTRY_URI).install();
}

Raven.context(function() {
  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(<App />);
});
