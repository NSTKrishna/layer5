module.exports = {
  testEnvironment: "jsdom",
  // Target the running node version so babel-preset-gatsby does not inject
  // browser core-js polyfills, which the site does not install.
  transform: {
    "\\.[jt]sx?$": [
      "babel-jest",
      { presets: [["babel-preset-gatsby", { targets: { node: "current" } }]] },
    ],
  },
  // Only pick up the maintained suites under __tests__ directories. The legacy
  // enzyme `*.test.js` files next to components target React 16 and are not run.
  testMatch: ["**/__tests__/**/*.test.js"],
  collectCoverageFrom: ["src/utils/**/*.js"],
  coveragePathIgnorePatterns: ["/node_modules/"],
};
