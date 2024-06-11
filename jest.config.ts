import type { Config } from "jest";

const config: Config = {
  verbose: true,
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/e2e/"],
};

export default config;
