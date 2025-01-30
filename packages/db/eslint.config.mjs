// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  // Ignoring bin.js because of error
  //  A `require()` style import is forbidden  @typescript-eslint/no-require-imports
  { ignores: ["dist", "node_modules", "generated"] }
);
