const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], 
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    'src/app/**/*.{ts,tsx,js,jsx}',
    'src/lib/**/*.{ts,tsx,js,jsx}',
    'src/components/**/*.{ts,tsx,js,jsx}',
    '!**/node_modules/**',
    '!**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};

module.exports = createJestConfig(customJestConfig);