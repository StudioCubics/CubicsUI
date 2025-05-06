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
   * The baseUrl defines where to start walking when traversing while downloading or uploading the component
   * this is usually taken from tsconfig or jsconfig and when none of these exist it defaults to current working directory.
   * @see https://www.typescriptlang.org/tsconfig#baseUrl
   * @default "."
   */
  baseUrl: string;
}

export type LibraryDocument = HydratedDocument<Library>;
export type LibraryModelType = Model<
  Library,
  object,
  object,
  object,
  LibraryDocument
>;
