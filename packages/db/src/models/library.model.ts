import Library from "@/types/library";
import { HydratedDocument, Model, Schema, model, models } from "mongoose";

type LibraryHydratedDocument = HydratedDocument<Library>;
type LibraryModelType = Model<
  Library,
  object,
  object,
  object,
  LibraryHydratedDocument
>;

/**
 * Mongoose schema for library
 * @type {Schema<Library,LibraryModelType>}
 */
const librarySchema: Schema<Library, LibraryModelType> = new Schema<
  Library,
  LibraryModelType
>(
  {
    name: { type: String, required: true },
    desc: String,
    componentCount: { type: Number, default: 0 },
    rootPath: { type: String, required: true },
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);

librarySchema.index({ name: 1 }, { unique: true });

const LibraryModel =
  (models.Library as Model<Library, LibraryModelType>) ||
  model<Library, LibraryModelType>("Library", librarySchema);

export default LibraryModel;
