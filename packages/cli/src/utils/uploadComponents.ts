import {
  CodeblockModel,
  ComponentModel,
  connectDB,
  disconnectDB,
  LibraryModel,
} from "@cubicsui/db";

export default async function uploadComponents(componentPath: string) {
  try {
    console.log(`uploading components ${componentPath}`);
    await connectDB();
    const library = new LibraryModel({
      name: "defaultLibrary",
      rootPath: "./components",
      desc: "The default library that is created when no library is selected",
    });
    const codeblock = new CodeblockModel({
      code: `//TODO: Code for avatar`,
    });
    const component = new ComponentModel({
      name: "Avatar",
      size: 300,
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
