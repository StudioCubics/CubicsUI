import { Component, ComponentModelType } from "../types/component.js";
import {
  Dependencies,
  ExternalDependency,
  LocalDependency,
} from "../types/dependencies.js";
import mongoose from "mongoose";

// -------------------------------------------------------- Schemas ---------------------------------------------------------------- //

/**
 * Mongoose schema for the external dependencies
 */
const externalDependencySchema = new mongoose.Schema<ExternalDependency>(
  {
    name: { type: String, required: true },
    ver: { type: String, default: "@latest" },
    type: { type: String },
  },
  { _id: false }
);

/**
 * Mongoose schema for the local dependencies
 */
const localDependencySchema = new mongoose.Schema<LocalDependency>(
  {
    value: { type: String },
    path: { type: String, required: true },
    cmp: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  },
  { _id: false }
);

/**
 * Mongoose schema for the component dependencies
 */
const dependenciesSchema = new mongoose.Schema<Dependencies>(
  {
    ext: [externalDependencySchema],
    lcl: [localDependencySchema],
  },
  { _id: false }
);

/**
 * Mongoose schema for a component
 */
const componentSchema = new mongoose.Schema<Component>(
  {
    name: { type: String, required: true },
    outPath: { type: String, required: true },
    desc: String,
    deps: dependenciesSchema,
    lib: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
      required: true,
    },
    script: { type: mongoose.Schema.Types.ObjectId, ref: "Codeblock" },
    styles: { type: mongoose.Schema.Types.ObjectId, ref: "Codeblock" },
    doc: { type: mongoose.Schema.Types.ObjectId, ref: "Codeblock" },
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);

// -------------------------------------------------------- Indexes ---------------------------------------------------------------- //

// Indexing so that only one component with the same name and outpath can exist in a particular library
componentSchema.index({ lib: 1, name: 1, outPath: 1 }, { unique: true });

// -------------------------------------------------------- Middlewares ---------------------------------------------------------------- //

// Cascade delete of codeblocks when using deleteOne on a document level
componentSchema.pre("deleteOne", { document: true }, async function (next) {
  try {
    const ids = [this.script, this.styles, this.doc].filter(Boolean);
    if (ids.length > 0) {
      const result = await mongoose
        .model("Codeblock")
        .deleteMany({ _id: { $in: ids } });

      console.log(
        `✅ [Component] Cascade deleted ${result.deletedCount} codeblock associated with "${this.name}"`
      );
    }
    next();
  } catch (error) {
    console.error(
      `❌ [Component] Failed to cascade delete codeblocks for component "${this.name}":`,
      error
    );
    if (error instanceof Error) next(error);
  }
});

// Cascade delete of codeblocks when using findOneAndDelete on Component (query level)
componentSchema.pre("findOneAndDelete", async function (next) {
  try {
    // Get the document that would be deleted
    const doc = await this.model.findOne(this.getFilter()).exec();

    if (!doc) {
      return next();
    }

    const ids = [doc.script, doc.styles, doc.doc].filter(Boolean);

    if (ids.length > 0) {
      const result = await mongoose
        .model("Codeblock")
        .deleteMany({ _id: { $in: ids } });

      console.log(
        `✅ [Component] Cascade deleted ${result.deletedCount} codeblock associated with "${doc.name}".`
      );
    }
    next();
  } catch (error) {
    console.error(`❌ [Component] Failed to cascade delete codeblocks:`, error);
    if (error instanceof Error) next(error);
  }
});

// -------------------------------------------------------- Models ---------------------------------------------------------------- //

const ComponentModel =
  (mongoose.models.Component as ComponentModelType) ||
  mongoose.model("Component", componentSchema);

export default ComponentModel;
