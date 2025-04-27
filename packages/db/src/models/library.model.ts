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

// -------------------------------------------------------- Schemas ---------------------------------------------------------------- //

/**
 * Mongoose schema for library
 * @type {Schema<Library,LibraryModelType>}
 */
const librarySchema: mongoose.Schema<Library, LibraryModelType> =
  new mongoose.Schema<Library, LibraryModelType>(
    {
      name: { type: String, required: true },
      desc: String,
      rootPath: { type: String, required: true },
    },
    { timestamps: { createdAt: "created", updatedAt: "updated" } }
  );

// -------------------------------------------------------- Indexes ---------------------------------------------------------------- //

// Indexing library so that only one library with the same name exists in the database
librarySchema.index({ name: 1 }, { unique: true });

// -------------------------------------------------------- Middlewares ---------------------------------------------------------------- //

// Cascade deleting of the components in the library when deleting library using deleteOne
librarySchema.pre("deleteOne", { document: true }, async function (next) {
  try {
    // Find all components with this library ID
    const ComponentModel = mongoose.model("Component");
    const result = await ComponentModel.deleteMany({ lib: this._id });

    console.log(
      `[Library] Cascade deleted ${result.deletedCount} components associated with library "${this.name}".`
    );
    next();
  } catch (error) {
    console.error(
      `[Library] Failed to cascade delete components for library "${this.name}":`,
      error
    );
    if (error instanceof Error) next(error);
  }
});

// Cascade delete of components when using findOneAndDelete on Library (query level)
librarySchema.pre("findOneAndDelete", async function (next) {
  try {
    // Get the library document that would be deleted
    const doc = await this.model.findOne(this.getFilter()).exec();

    if (!doc) {
      return next();
    }

    // Find all components with this library ID
    const ComponentModel = mongoose.model("Component");
    const result = await ComponentModel.deleteMany({ lib: doc._id });

    console.log(
      `[Library] Cascade deleted ${result.deletedCount} components associated with library "${doc.name}".`
    );
    next();
  } catch (error) {
    console.error(`[Library] Failed to cascade delete components:`, error);
    if (error instanceof Error) next(error);
  }
});

// -------------------------------------------------------- Models ---------------------------------------------------------------- //

const LibraryModel =
  (mongoose.models.Library as mongoose.Model<Library, LibraryModelType>) ||
  mongoose.model<Library, LibraryModelType>("Library", librarySchema);

export default LibraryModel;
