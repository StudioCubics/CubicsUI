import { mdxSource } from "@/app/docs/source";

export const dynamic = "force-static"; // built once during `next build`
export const GET = async () => Response.json(await mdxSource.getSearchIndex());
