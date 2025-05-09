import pc from "picocolors";
import { Codeblock, CodeblockModelType } from "../types/codeblock.js";
import mongoose from "mongoose";

/**
 * Mongoose schema for codeblock
 */
const codeblockSchema = new mongoose.Schema<Codeblock, CodeblockModelType>(
  {
    name: { type: String, required: true },
    content: { type: String, required: true },
    size: { type: Number, required: true },
  },
  {
    timestamps: { createdAt: "created", updatedAt: "updated" },
  }
);

// -------------------------------------------------------- Statics ---------------------------------------------------------------- //

codeblockSchema.static(
  "findByIdOrThrow",
  async function findByIdOrThrow(id: mongoose.Types.ObjectId) {
    const doc = await this.findById(id).exec();
    // If document doesn't exist, throw
    if (!doc) {
      throw new Error(
        `⛔ The Codeblock with id "${pc.bold(id.toString())}" is missing in the database.`
      );
    }
    return doc;
  }
);

// -------------------------------------------------------- Models ---------------------------------------------------------------- //

const CodeblockModel =
  (mongoose.models.Codeblock as CodeblockModelType) ||
  mongoose.model("Codeblock", codeblockSchema);

export default CodeblockModel;
