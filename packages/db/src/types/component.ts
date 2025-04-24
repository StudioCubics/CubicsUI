import { Types } from "mongoose";
import { Dependencies } from "./dependencies.js";
import Codeblock from "./codeblock.js";
import Library from "./library.js";

/**
 * A component is the main building block of CubicsUI
 * It contains the metadata for the file and the info for which library the codeblock belongs to
 */
export default interface Component {
  name: string;
  size: number;
  outPath: string;
  desc?: string;
  deps: Dependencies;
  lib: Types.ObjectId;
  cb: Types.ObjectId;
}

export interface PopulatedComponent {
  lib: Library;
  cb: Codeblock;
}
export type LibraryPopulatedComponent = Pick<PopulatedComponent, "lib">;

export type CodeblockPopulatedComponent = Pick<PopulatedComponent, "cb">;
