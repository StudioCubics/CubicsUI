import {
  CodeblockModel,
  ComponentModel,
  connectDB,
  disconnectDB,
  LibraryModel,
} from "@cubicsui/db";
import fs from "fs-extra";

export default async function uploadComponents(componentPath: string) {
  try {
    if (!fs.existsSync(componentPath))
      throw new Error(`No file found in ${componentPath}`);

    console.log(`uploading components ${componentPath}`);

    const componentSize = (await fs.stat(componentPath)).size;
    const componentData = (await fs.readFile(componentPath)).toString();

    await connectDB();
    const library = new LibraryModel({
      name: "defaultLibrary",
      rootPath: "./components",
      desc: "The default library that is created when no library is selected",
    });
    const codeblock = new CodeblockModel({
      code: componentData,
    });
    const component = new ComponentModel({
      name: "Avatar",
      size: componentSize,
      outPath: componentPath,
      deps: { lcl: [], ext: [] },
      lib: library._id,
      cb: codeblock._id,
    });
    await library.save();
    await component.save();
    await codeblock.save();
    console.log(`completed uploading components ${componentPath}`);
    await disconnectDB();
  } catch (error) {
    console.error(error);
    await disconnectDB();
    process.exit(1);
  }
}
