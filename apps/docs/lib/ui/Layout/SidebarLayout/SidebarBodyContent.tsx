import type { Route } from "next";
import { type ReactElement, Suspense } from "react";
import { mdxSource } from "@/app/docs/source";
import { SidebarList } from "./SidebarList";

export async function SidebarBodyContent(): Promise<ReactElement> {
  const tree = await mdxSource.getPageTree<Route>("/docs");
  return (
    <Suspense>
      <SidebarList tree={tree} />
    </Suspense>
  );
}
