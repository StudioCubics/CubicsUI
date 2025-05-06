import { CUIConfig } from "@/types/cuiConfig.js";
import { LibraryModel } from "@cubicsui/db";
import pc from "picocolors";

export default async function findOrCreateLibrary(
  libraryOptions: CUIConfig["libraryOptions"]
) {
  let library = await LibraryModel.findOne({
    name: libraryOptions.libraryName,
  }).exec();

  if (library)
    console.log(
      `✔ Found library "${pc.bold(libraryOptions.libraryName)}" in database.`
    );

  if (!library) {
    library = await LibraryModel.create({
      name: libraryOptions.libraryName,
      desc: "",
      baseUrl: libraryOptions.baseUrl,
    });

    console.log(
      `✔ Created library "${pc.bold(libraryOptions.libraryName)}" in database.`
    );
  }
  return library;
}
