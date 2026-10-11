import matter from "gray-matter";
import { banner } from "../constants/global.js";

export function finaliseMDX(
  transformedContent: string,
  frontmatter: Record<string, unknown>,
) {
  transformedContent = `${banner}${transformedContent}`;
  // TODO Prettify content if i find some formatter for mdx that is sync
  transformedContent = matter.stringify(transformedContent, frontmatter);
  return transformedContent;
}
