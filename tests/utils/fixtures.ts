import { resolve } from "path";

export interface Fixture extends Record<string, any> {
  name: string;
  initCommand: {
    args: readonly string[];
    responses: readonly string[];
  };
  path: string;
}

export const jsxFixtures = (lib: string): Fixture => {
  return {
    name: "jsx",
    initCommand: {
      args: [
        "cui",
        "init",
        "--db",
        "mongodb://localhost:27017/cubicsui",
        "--lib",
        lib,
        "--sp",
        "*.module.scss",
        "--dp",
        "*.md",
      ],
      responses: ["n\n"],
    },
    path: resolve(__dirname, "../fixtures/jsx"),
  };
};
export const tsxFixtures = (lib: string): Fixture => {
  return {
    name: "tsx",
    initCommand: {
      args: [
        "cui",
        "init",
        "--ts",
        "--db",
        "mongodb://localhost:27017/cubicsui",
        "--lib",
        lib,
        "--sp",
        "*.module.scss",
        "--dp",
        "*.md",
      ],
      responses: [],
    },
    path: resolve(__dirname, "../fixtures/tsx"),
  };
};
