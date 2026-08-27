const slugify = require("../slugify");

describe("slugify", () => {
  it("lowercases and replaces whitespace runs with a single dash", () => {
    expect(slugify("Service Mesh   Performance")).toBe(
      "service-mesh-performance",
    );
  });

  it("strips non-word characters", () => {
    expect(slugify("Meshery: what's new? (2025)")).toBe(
      "meshery-whats-new-2025",
    );
  });

  it("collapses repeated dashes", () => {
    expect(slugify("cloud---native")).toBe("cloud-native");
  });

  it("trims leading and trailing dashes", () => {
    expect(slugify("--layer5--")).toBe("layer5");
  });

  it("keeps underscores and existing slug-safe text untouched", () => {
    expect(slugify("service_mesh-patterns")).toBe("service_mesh-patterns");
  });

  it("accepts non-string input", () => {
    expect(slugify(2025)).toBe("2025");
  });

  it("returns an empty string when nothing slug-safe remains", () => {
    expect(slugify("!!!")).toBe("");
  });
});
