"use client";

import { type BreadcrumbItem, Breadcrumbs } from "@cubicsui/components";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DocsBreadcrumbs(props: {
  breadcrumbs: BreadcrumbItem<Route>[];
}) {
  const { breadcrumbs } = props;
  const pathname = usePathname();
  if (breadcrumbs.length === 1) return;
  return (
    <Breadcrumbs
      size="sm"
      className={"breakout"}
      selectedWhen={({ href }) => pathname === href}
    >
      {breadcrumbs.map((c) =>
        c.href ? (
          <Link key={c.id} href={c.href}>
            {c.children}
          </Link>
        ) : (
          <span key={c.id}>{c.children}</span>
        ),
      )}
    </Breadcrumbs>
  );
}
