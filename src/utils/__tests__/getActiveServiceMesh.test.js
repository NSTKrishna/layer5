import { getActiveServiceMesh } from "../getActiveServiceMesh";

const chapter = (slug) => ({ fields: { slug } });

describe("getActiveServiceMesh", () => {
  it("returns the fifth slug segment, which holds the mesh name", () => {
    expect(
      getActiveServiceMesh(
        chapter("/learn/service-mesh-management/istio/intro/"),
      ),
    ).toBe("intro");
    expect(
      getActiveServiceMesh(
        chapter("/content/learn/service-mesh-management/istio/intro"),
      ),
    ).toBe("istio");
  });

  it("returns undefined for slugs shorter than five segments", () => {
    expect(getActiveServiceMesh(chapter("/learn/istio"))).toBeUndefined();
  });

  it("throws when the chapter has no slug", () => {
    expect(() => getActiveServiceMesh({ fields: {} })).toThrow();
  });
});
