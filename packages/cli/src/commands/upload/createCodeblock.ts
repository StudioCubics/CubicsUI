import { CodeblockDocument, CodeblockModel } from "@cubicsui/db";
import fs from "fs-extra";
import { basename } from "path";

export default async function createCodeblock(
  filePath: string,
  codeblocksToSave: CodeblockDocument[]
) {
  if (!fs.existsSync(filePath)) return null;

  const size = (await fs.stat(filePath)).size;
  const content = (await fs.readFile(filePath)).toString();

  const codeblock = new CodeblockModel({
    name: basename(filePath),
    size,
    content,
  });

  codeblocksToSave.push(codeblock);
  return codeblock._id;
}
