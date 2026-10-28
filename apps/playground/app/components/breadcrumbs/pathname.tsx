// PathnameExample.tsx
"use client";

import { Breadcrumbs } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";
import { toCapitalised } from "@cubicsui/utils";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

// 7. Pathname-generated crumbs + selectedWhen
export function PathnameExample() {
  const pathname = usePathname();

  // "/a/b/c" -> ["a", "b", "c"]
  const segments = pathname.split("/").filter(Boolean);

  // Build cumulative hrefs: "/a", "/a/b", "/a/b/c"
  const crumbs = [
    { href: "/", label: <CubicsUIFavicon /> },
    ...segments.map((segment, i) => ({
      href: `/${segments.slice(0, i + 1).join("/")}`,
      label: toCapitalised(decodeURIComponent(segment)),
    })),
  ];

  return (
    <Breadcrumbs selectedWhen={({ href }) => href === pathname}>
      {crumbs.map(({ href, label }) => (
        <Link key={href} href={href as Route} id={href}>
          {label}
        </Link>
      ))}
    </Breadcrumbs>
  );
}
