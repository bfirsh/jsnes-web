import React from "react";
import ReactDOM from "react-dom";
import { StaticRouter, Route } from "react-router-dom";
import ListPage from "./ListPage";

describe("ListPage", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <StaticRouter location="/" context={{}}>
        <Route exact path="/" component={ListPage} />
      </StaticRouter>,
      div
    );
  });
});
