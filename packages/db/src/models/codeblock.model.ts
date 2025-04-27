import Codeblock from "../types/codeblock.js";
import mongoose, { type HydratedDocument, type Model } from "mongoose";

type CodeblockHydratedDocument = HydratedDocument<Codeblock>;
type CodeblockModelType = Model<
  Codeblock,
  object,
  object,
  object,
  CodeblockHydratedDocument
>;

/**
 * Mongoose schema for codeblock
 * @type {mongoose.Schema<Codeblock,CodeblockModelType>}
 */
const codeblockSchema: mongoose.Schema<Codeblock, CodeblockModelType> =
  new mongoose.Schema<Codeblock, CodeblockModelType>(
    {
      content: { type: String, required: true },
      size: { type: Number, required: true },
    },
    { timestamps: { createdAt: "created", updatedAt: "updated" } }
  );

const CodeblockModel =
  (mongoose.models.Codeblock as Model<Codeblock, CodeblockModelType>) ||
  mongoose.model<Codeblock, CodeblockModelType>("Codeblock", codeblockSchema);

export default CodeblockModel;
