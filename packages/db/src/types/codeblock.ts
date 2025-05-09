import { HydratedDocument, Model, Types } from "mongoose";

/**
 * A code block contains the code content in the file
 */
export interface Codeblock {
  /**
   * name of the file the codeblock will be output to
   */
  name: string;
  /**
   * Size in bytes of the particular codeblock
   */
  size: number;
  /**
   * Content of the codeblock
   */
  content: string;
}
export type CodeblockDocument = HydratedDocument<Codeblock>;
export type CodeblockModelType = Model<Codeblock> & {
  /**
   * Find a codeblock by if or throw an error if it doesn't exist
   * @param id - The id of the codeblock to find
   * @returns the found codeblock
   * @throws {Error} if library doesn't exist
   */
  findByIdOrThrow(id: Types.ObjectId): Promise<CodeblockDocument>;
};
