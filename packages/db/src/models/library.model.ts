import pc from "picocolors";
import { Library, LibraryModelType } from "../types/library.js";
import mongoose, { RootFilterQuery } from "mongoose";

// -------------------------------------------------------- Schemas ---------------------------------------------------------------- //

/**
 * Mongoose schema for library
 */
const librarySchema = new mongoose.Schema<Library, LibraryModelType>(
  {
    name: { type: String, required: true },
    desc: String,
    baseUrl: { type: String, default: "." },
  },
  {
    timestamps: { createdAt: "created", updatedAt: "updated" },
  }
);

// -------------------------------------------------------- Statics ---------------------------------------------------------------- //

librarySchema.static(
  "findOneOrThrow",
  async function findOneOrThrow(filter: RootFilterQuery<Library>) {
    const doc = await this.findOne(filter).exec();
    // If document doesn't exist, throw
    if (!doc) {
      throw new Error(
        `⛔ The Library you are looking for is missing in the database, check ${pc.bold("libraryName")} field in cui.config.`
      );
    }
    return doc;
  }
);

librarySchema.static(
  "findOneOrCreate",
  async function findOneOrCreate(
    filter: RootFilterQuery<Library>,
    data: Library
  ) {
    const doc = await this.findOne(filter).exec();
    if (!doc) {
      // If no document found, create it
      const newDoc = await LibraryModel.create(data);
      console.log(`✅ Created library "${pc.bold(newDoc.name)}" in database.`);
      return newDoc;
    }
    console.log(`🔍 Found library "${pc.bold(doc.name)}" in database.`);
    return doc;
  }
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
      `✅ [Library] Cascade deleted ${result.deletedCount} components associated with library "${this.name}".`
    );
    next();
  } catch (error) {
    console.error(
      `❌ [Library] Failed to cascade delete components for library "${this.name}":`,
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
      `✅ [Library] Cascade deleted ${result.deletedCount} components associated with library "${doc.name}".`
    );
    next();
  } catch (error) {
    console.error(`❌ [Library] Failed to cascade delete components:`, error);
    if (error instanceof Error) next(error);
  }
});

// -------------------------------------------------------- Models ---------------------------------------------------------------- //

const LibraryModel =
  (mongoose.models.Library as LibraryModelType) ||
  mongoose.model("Library", librarySchema);

export default LibraryModel;
