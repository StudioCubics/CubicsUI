import { HydratedDocument, Model } from "mongoose";

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
export type CodeblockModelType = Model<
  Codeblock,
  object,
  object,
  object,
  CodeblockDocument
>;
