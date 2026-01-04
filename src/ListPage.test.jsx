import { createRoot } from "react-dom/client";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ListPage from "./ListPage";

describe("ListPage", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<ListPage />} />
        </Routes>
      </MemoryRouter>,
    );
  });
});
