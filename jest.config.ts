import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // setupFiles runs BEFORE the test framework is installed —
  // used to inject environment variables that modules read at load time
  setupFiles: ["<rootDir>/jest.env.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/app/layout.tsx",
    "!src/app/providers.tsx",
    "!src/providers/**",
    "!src/store/store.ts",
    "!src/app/**/page.{js,ts,tsx}",
    "!src/app/**/layout.{js,ts,tsx}",
  ],
};

export default createJestConfig(config);
