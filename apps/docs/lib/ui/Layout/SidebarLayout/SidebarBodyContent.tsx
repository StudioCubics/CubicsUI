import { mdxSource } from "@/app/docs/source";
import type { ReactElement } from "react";
import { SidebarList } from "./SidebarList";
import type { Route } from "next";

export async function SidebarBodyContent(): Promise<ReactElement> {
  const tree = await mdxSource.getPageTree<Route>("/docs");
  return <SidebarList tree={tree} />;
}
