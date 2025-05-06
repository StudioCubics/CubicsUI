import { CUIConfig } from "@/types/cuiConfig.js";
import { LibraryModel } from "@cubicsui/db";

export default async function findOrCreateLibrary(
  databaseOptions: CUIConfig["libraryOptions"]
) {
  let library = await LibraryModel.findOne({
    name: databaseOptions.libraryName,
  }).exec();
  if (!library) {
    library = await LibraryModel.create({
      name: databaseOptions.libraryName,
      desc: "",
      baseUrl: databaseOptions.baseUrl,
    });
  }
  return library;
}
