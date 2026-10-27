import { Table, TableCell } from "@cubicsui/components";
import type { MDXComponents } from "mdx/types";
import { Callout } from "./ui/Display/Callout/Callout";
import { CodeBlock } from "./ui/Display/CodeBlock/CodeBlock";
import { Sandcube } from "./ui/Inputs/Sandcube/Sandcube";
import { SandcubeFile } from "./ui/Inputs/Sandcube/SandcubeFile";
import { PageLayoutMd } from "./ui/Layout/PageLayoutMd/PageLayoutMd";

export const defaultComponents: MDXComponents = {
  pre: CodeBlock,
  td: (props) => <TableCell {...props} />,
  th: (props) => <TableCell as="th" {...props} />,
  table: (props) => <Table {...props} />,
  Sandcube,
  SandcubeFile,
  wrapper: PageLayoutMd,
  Callout,
};
