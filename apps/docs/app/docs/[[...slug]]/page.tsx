import { PageLayoutMD } from "@cubicsui/mdx";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DocsBreadcrumbs } from "@/lib/ui/Display/DocsBreadcrumbs";
import { mdxSource } from "../source";

export const dynamicParams = false;

export function generateStaticParams() {
  return mdxSource.getStaticParams();
}

export default async function Page({ params }: PageProps<"/docs/[[...slug]]">) {
  const { slug } = await params;
  const source = await mdxSource.getPage<Route>(slug);
  if (!source) notFound();
  const { content, frontmatter, scope, error } = source;
  if (error) throw error;
  const { toc = true, breadcrumbs = true } = frontmatter;

  return (
    <PageLayoutMD
      title={frontmatter.title}
      desc={frontmatter.description}
      tree={toc ? scope.toc : undefined}
      breadcrumbs={
        breadcrumbs ? (
          <DocsBreadcrumbs breadcrumbs={scope.breadcrumbs} />
        ) : undefined
      }
    >
      <Suspense>{content}</Suspense>
    </PageLayoutMD>
  );
}
