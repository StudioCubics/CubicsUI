import type { MDXComponents } from "mdx/types";
import { Sandcube } from "./lib/ui/Display/Sandcube/Sandcube";
import { SandcubeFile } from "./lib/ui/Display/Sandcube/SandcubeFile";
import { CodeBlock } from "./lib/ui/Display/CodeBlock/CodeBlock";

const components: MDXComponents = {
  pre: CodeBlock,
  Sandcube,
  SandcubeFile,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
