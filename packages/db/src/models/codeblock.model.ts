import Codeblock from "@/types/codeblock";
import { HydratedDocument, Model, Schema, model, models } from "mongoose";

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
 * @type {Schema<Codeblock,CodeblockModelType>}
 */
const codeblockSchema: Schema<Codeblock, CodeblockModelType> = new Schema<
  Codeblock,
  CodeblockModelType
>(
  {
    code: { type: String, required: true },
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);

const CodeblockModel =
  (models.Codeblock as Model<Codeblock, CodeblockModelType>) ||
  model<Codeblock, CodeblockModelType>("Codeblock", codeblockSchema);

export default CodeblockModel;
