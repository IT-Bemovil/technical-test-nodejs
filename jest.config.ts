export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
  verbose: true,
  collectCoverage: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  coverageDirectory: "coverage",
};
