import React, { act } from "react";
import { createRoot } from "react-dom/client";
import useDataList from "../usedataList";

const data = [
  { id: "1", title: "Meshery", body: "cloud native manager" },
  { id: "2", title: "Kanvas", body: "collaborative designer" },
];

const renderDataList = (setSearchQuery, searchQuery) => {
  const hook = {};
  const Probe = () => {
    Object.assign(
      hook,
      useDataList(data, setSearchQuery, searchQuery, "title", "id"),
    );
    return null;
  };

  act(() => {
    createRoot(document.createElement("div")).render(<Probe />);
  });

  return hook;
};

describe("useDataList", () => {
  beforeEach(() => {
    global.IS_REACT_ACT_ENVIRONMENT = true;
  });

  it("exposes the full data list when there is no search query", () => {
    expect(renderDataList(jest.fn(), "").queryResults).toEqual(data);
  });

  it("reports the trimmed query and the matching documents on search", () => {
    const setSearchQuery = jest.fn();
    const hook = renderDataList(setSearchQuery, "");

    act(() => {
      hook.searchData({ target: { value: "  Kanvas  " } });
    });

    expect(setSearchQuery).toHaveBeenCalledWith("Kanvas");
    expect(hook.queryResults).toEqual(data);
  });

  it("returns the search results once a query is active", () => {
    const hook = renderDataList(jest.fn(), "Kanvas");

    act(() => {
      hook.searchData({ target: { value: "Kanvas" } });
    });

    expect(hook.queryResults).toEqual([data[1]]);
  });

  it("re-indexes when the data list is replaced", () => {
    const hook = renderDataList(jest.fn(), "Meshery");
    const replacement = [
      { id: "3", title: "Meshery Catalog", body: "designs" },
    ];

    act(() => {
      hook.setDataList(replacement);
    });

    expect(hook.dataList).toEqual(replacement);

    act(() => {
      hook.searchData({ target: { value: "Meshery" } });
    });

    expect(hook.queryResults).toEqual(replacement);
  });
});
