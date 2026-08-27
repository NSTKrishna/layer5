import { getCurrentPage } from "../getCurrentPage";

describe("getCurrentPage", () => {
  it("returns the last path segment", () => {
    expect(
      getCurrentPage({
        href: "https://layer5.io/learn/service-mesh-management",
      }),
    ).toBe("service-mesh-management");
  });

  it("falls back to the previous segment for trailing slashes", () => {
    expect(getCurrentPage({ href: "https://layer5.io/learn/istio/" })).toBe(
      "istio",
    );
  });

  it("drops a .html extension", () => {
    expect(
      getCurrentPage({ href: "https://layer5.io/learn/chapter-1.html" }),
    ).toBe("chapter-1");
  });

  it("returns undefined when location or href is missing", () => {
    expect(getCurrentPage(undefined)).toBeUndefined();
    expect(getCurrentPage({})).toBeUndefined();
  });
});
