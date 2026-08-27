import { checkImageUrlValidity } from "../imageValidate";

describe("checkImageUrlValidity", () => {
  let instances;
  const originalImage = global.Image;

  beforeEach(() => {
    instances = [];
    global.Image = class {
      constructor() {
        instances.push(this);
      }
    };
  });

  afterEach(() => {
    global.Image = originalImage;
  });

  it("resolves true once the image loads", async () => {
    const result = checkImageUrlValidity("https://layer5.io/logo.svg");
    expect(instances[0].src).toBe("https://layer5.io/logo.svg");
    instances[0].onload();
    await expect(result).resolves.toBe(true);
  });

  it("resolves false when the image errors", async () => {
    const result = checkImageUrlValidity("https://layer5.io/missing.svg");
    instances[0].onerror();
    await expect(result).resolves.toBe(false);
  });
});
