import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "./ui/Display/CodeBlock/CodeBlock";
import { Sandcube } from "./ui/Display/Sandcube/Sandcube";
import { SandcubeFile } from "./ui/Display/Sandcube/SandcubeFile";
import { PageLayoutMd } from "./ui/Layout/PageLayoutMd/PageLayoutMd";

export const components: MDXComponents = {
  pre: CodeBlock,
  Sandcube,
  SandcubeFile,
  wrapper: PageLayoutMd,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
