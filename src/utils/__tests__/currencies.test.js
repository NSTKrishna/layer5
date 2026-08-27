import {
  Currencies,
  formatAndConvertPrice,
  formatSliderPrice,
} from "../currencies";

describe("Currencies.formatPrice", () => {
  it("formats USD without conversion", () => {
    expect(Currencies.USD.formatPrice(1234.5)).toBe("$1,234.50");
  });

  it("rounds to whole units when asked to round for display", () => {
    expect(Currencies.USD.formatPrice(1234.56, true)).toBe("$1,235");
  });

  it("converts using each currency's rate", () => {
    expect(Currencies.EUR.formatPrice(100)).toBe("€86.00");
    expect(Currencies.INR.formatPrice(100)).toBe("₹8,800.00");
  });

  it("rounds converted amounts for display", () => {
    expect(Currencies.EUR.formatPrice(100.9, true)).toBe("€87");
    expect(Currencies.INR.formatPrice(1.004, true)).toBe("₹88");
  });
});

describe("formatAndConvertPrice", () => {
  it("delegates to the matching currency formatter", () => {
    expect(formatAndConvertPrice(50, "EUR")).toBe("€43.00");
  });

  it("falls back to a plain two-decimal string for unknown currencies", () => {
    expect(formatAndConvertPrice(50, "GBP")).toBe("50.00");
    expect(formatAndConvertPrice(50)).toBe("50.00");
  });
});

describe("formatSliderPrice", () => {
  it("omits decimals for whole converted amounts", () => {
    expect(formatSliderPrice(10, "USD")).toBe("$10");
  });

  it("keeps two decimals for fractional converted amounts", () => {
    expect(formatSliderPrice(10, "EUR")).toBe("€8.60");
  });

  it("treats unknown currencies as USD", () => {
    expect(formatSliderPrice(10.5, "GBP")).toBe("$10.50");
  });
});
