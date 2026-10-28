import type { CompilerOptions } from "typescript";

export const defaultTsCompilerOptions: CompilerOptions = {
  skipLibCheck: true,
  noEmit: true,
  skipDefaultLibCheck: true,
  noLib: true,
};
