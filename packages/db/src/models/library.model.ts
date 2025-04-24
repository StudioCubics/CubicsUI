import Library from "../types/library.js";
import mongoose, { type HydratedDocument, type Model } from "mongoose";

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
const librarySchema: mongoose.Schema<Library, LibraryModelType> =
  new mongoose.Schema<Library, LibraryModelType>(
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
  (mongoose.models.Library as mongoose.Model<Library, LibraryModelType>) ||
  mongoose.model<Library, LibraryModelType>("Library", librarySchema);

export default LibraryModel;
