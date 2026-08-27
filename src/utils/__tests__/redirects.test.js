jest.mock("fs", () => ({ readFileSync: jest.fn() }));

const fs = require("fs");
const { loadRedirects } = require("../redirects");

describe("loadRedirects", () => {
  afterEach(() => {
    fs.readFileSync.mockReset();
  });

  it("parses the redirect entries from the yaml file", () => {
    fs.readFileSync.mockReturnValue(
      [
        "redirects:",
        "  - from: /old-path",
        "    to: /new-path",
        "  - from: /legacy",
        "    to: /current",
      ].join("\n"),
    );

    expect(loadRedirects()).toEqual([
      { from: "/old-path", to: "/new-path" },
      { from: "/legacy", to: "/current" },
    ]);
    expect(fs.readFileSync).toHaveBeenCalledWith(
      "src/utils/redirects.yaml",
      "utf8",
    );
  });

  it("returns an empty list when the file has no redirects key", () => {
    fs.readFileSync.mockReturnValue("other: value\n");
    expect(loadRedirects()).toEqual([]);
  });
});
