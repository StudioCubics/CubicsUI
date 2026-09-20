import type { MDXComponents } from "mdx/types";
import { Sandcube } from "./lib/ui/Display/Sandcube/Sandcube";
import { SandcubeFile } from "./lib/ui/Display/Sandcube/SandcubeFile";

const components: MDXComponents = {
  Sandcube,
  SandcubeFile,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
