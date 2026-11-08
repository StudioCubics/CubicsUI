import { Table, TableCell } from "@cubicsui/components";
import type { MDXComponents } from "next-mdx-remote-client";
import { Callout, CodeBlock, Sandcube, SandcubeFile } from "../client";

export const defaultComponents: MDXComponents = {
  pre: CodeBlock,
  td: (props) => <TableCell {...props} />,
  th: (props) => <TableCell as="th" {...props} />,
  table: (props) => <Table {...props} />,
  Sandcube,
  SandcubeFile,
  Callout,
};
