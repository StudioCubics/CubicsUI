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
export type LibraryModelType = Model<Library> & {
  /**
   * Find a library by name or throw an error if it doesn't exist
   * @param filter - The filter to find the library
   * @returns the found library
   * @throws {Error} if library doesn't exist
   */
  findOneOrThrow(filter: Partial<Library>): Promise<LibraryDocument>;
  /**
   * Find a library by name or creates it doesn't exist
   * @param filter - The filter to find the library
   * @param data - The data to create the library if it doesn't exist
   * @returns the found library
   */
  findOneOrCreate(
    filter: Partial<Library>,
    data: Library
  ): Promise<LibraryDocument>;
};
