import { mdxSource } from "@/app/docs/source";
import type { ReactElement } from "react";
import { SidebarList } from "./SidebarList";

export async function SidebarBodyContent(): Promise<ReactElement> {
  const tree = await mdxSource.getPageTree("/docs");
  const pkgs = tree.map((t) => t.id);
  console.log({ pkgs, tree });

  return <SidebarList tree={tree} />;
}
