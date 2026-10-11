import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageLayoutTOC } from "@cubicsui/components";
import { mdxSource } from "../source";

export default async function Page({ params }: PageProps<"/docs/[[...slug]]">) {
  const { slug } = await params;
  const source = await mdxSource.getPage(slug);
  if (!source) notFound();
  const { content, frontmatter, scope, error } = source;
  if (error) throw error;
  console.log("toc", frontmatter.toc);

  if (frontmatter.toc)
    return (
      <PageLayoutTOC
        title={frontmatter.title}
        desc={frontmatter.description}
        tree={scope.toc}
      >
        {content}
      </PageLayoutTOC>
    );

  return (
    <>
      <h1>{frontmatter.title}</h1>
      {scope.readingTime && <p>read in {scope.readingTime}</p>}
      <Suspense fallback={"Loading..."}>{content}</Suspense>
    </>
  );
}
