import path from "path";

export const shortMdxPath = (mdxPath: string) =>
  mdxPath.split(`${path.sep}src${path.sep}`)[1] ?? mdxPath;

export const shortDestFile = (destFile: string) =>
  destFile.split(
    `${path.sep}docs${path.sep}content${path.sep}`,
  )[1] ?? destFile;
