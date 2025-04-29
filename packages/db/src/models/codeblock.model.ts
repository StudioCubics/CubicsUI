import { Codeblock, CodeblockModelType } from "../types/codeblock.js";
import mongoose from "mongoose";

/**
 * Mongoose schema for codeblock
 * @type {mongoose.Schema<Codeblock,CodeblockModelType>}
 */
const codeblockSchema: mongoose.Schema<Codeblock, CodeblockModelType> =
  new mongoose.Schema<Codeblock, CodeblockModelType>(
    {
      name: { type: String, required: true },
      content: { type: String, required: true },
      size: { type: Number, required: true },
    },
    { timestamps: { createdAt: "created", updatedAt: "updated" } }
  );

const CodeblockModel =
  (mongoose.models.Codeblock as mongoose.Model<
    Codeblock,
    CodeblockModelType
  >) ||
  mongoose.model<Codeblock, CodeblockModelType>("Codeblock", codeblockSchema);

export default CodeblockModel;
