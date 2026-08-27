import React, { act } from "react";
import { createRoot } from "react-dom/client";
import useHasMounted from "../useHasMounted";

const Probe = ({ onRender }) => {
  onRender(useHasMounted());
  return null;
};

describe("useHasMounted", () => {
  beforeEach(() => {
    global.IS_REACT_ACT_ENVIRONMENT = true;
  });

  it("is false on the first render and true after mounting", () => {
    const renders = [];
    const container = document.createElement("div");

    act(() => {
      createRoot(container).render(
        <Probe onRender={(value) => renders.push(value)} />,
      );
    });

    expect(renders[0]).toBe(false);
    expect(renders[renders.length - 1]).toBe(true);
  });
});
