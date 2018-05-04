import React from "react";
import ReactDOM from "react-dom";
import { StaticRouter, Route } from "react-router-dom";
import RunPage from "./RunPage";

describe("RunPage", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <StaticRouter location="/roms/foo.nes" context={{}}>
        <Route exact path="/run/:rom" component={RunPage} />
      </StaticRouter>,
      div
    );
  });
});
