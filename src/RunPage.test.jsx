import { createRoot } from "react-dom/client";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import RunPage from "./RunPage";

describe("RunPage", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(
      <MemoryRouter initialEntries={["/run/test.nes"]}>
        <Routes>
          <Route path="/run/:rom" element={<RunPage />} />
        </Routes>
      </MemoryRouter>,
    );
  });
});
