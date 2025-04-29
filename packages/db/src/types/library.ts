import { HydratedDocument, Model } from "mongoose";

/**
 * A library is composition of components it can contain one or multiple components
 */
export interface Library {
  /**
   * Name of the library
   * @remarks This is unique in a database, so only one library with a particular name can exist in a database
   */
  name: string;
  /**
   * Small description of the library
   */
  desc?: string;
  /**
   * The rootPath defines where to start walking when traversing from procces.cwd() while downloading the component
   */
  rootPath: string;
}

export type LibraryDocument = HydratedDocument<Library>;
export type LibraryModelType = Model<
  Library,
  object,
  object,
  object,
  LibraryDocument
>;
