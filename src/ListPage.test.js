import { createRoot } from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import ListPage from "./ListPage";

describe("ListPage", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(
      <Routes location="/" context={{}}>
        <Route exact path="/" component={ListPage} />
      </Routes>
    );
  });
});
