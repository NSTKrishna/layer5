const {
  DEFAULT_LITE_BUILD_PROFILE,
  LITE_BUILD_PROFILES,
  getExcludedCollections,
  isFullSiteBuild,
} = require("../build-collections");

describe("isFullSiteBuild", () => {
  it("is true only for the exact string 'true'", () => {
    expect(isFullSiteBuild("true")).toBe(true);
    expect(isFullSiteBuild("TRUE")).toBe(false);
    expect(isFullSiteBuild("false")).toBe(false);
    expect(isFullSiteBuild(undefined)).toBe(false);
  });

  it("reads BUILD_FULL_SITE when no argument is given", () => {
    process.env.BUILD_FULL_SITE = "true";
    expect(isFullSiteBuild()).toBe(true);
    delete process.env.BUILD_FULL_SITE;
    expect(isFullSiteBuild()).toBe(false);
  });
});

describe("getExcludedCollections", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("excludes nothing for a full site build", () => {
    expect(
      getExcludedCollections({
        isFullSiteBuild: true,
        buildCollectionsExclude: "blog",
      }),
    ).toEqual([]);
  });

  it("returns the requested lite profile, sorted", () => {
    expect(
      getExcludedCollections({
        isFullSiteBuild: false,
        liteBuildProfile: "content",
      }),
    ).toEqual(["integrations", "members"]);
  });

  it("falls back to the default profile for an unknown profile", () => {
    expect(
      getExcludedCollections({
        isFullSiteBuild: false,
        liteBuildProfile: "does-not-exist",
      }),
    ).toEqual([...LITE_BUILD_PROFILES[DEFAULT_LITE_BUILD_PROFILE]].sort());
  });

  it("merges and de-duplicates the extra exclusions from BUILD_COLLECTIONS_EXCLUDE", () => {
    expect(
      getExcludedCollections({
        isFullSiteBuild: false,
        liteBuildProfile: "content",
        buildCollectionsExclude: " blog , members ,, news ",
      }),
    ).toEqual(["blog", "integrations", "members", "news"]);
  });

  it("defaults to the environment when called without options", () => {
    delete process.env.BUILD_FULL_SITE;
    delete process.env.BUILD_COLLECTIONS_EXCLUDE;
    process.env.LITE_BUILD_PROFILE = "content";
    expect(getExcludedCollections()).toEqual(["integrations", "members"]);
  });
});
