import Component from "../types/component.js";
import {
  Dependencies,
  ExternalDependency,
  LocalDependency,
} from "../types/dependencies.js";
import mongoose, { type HydratedDocument, type Model } from "mongoose";

type ComponentHydratedDocument = HydratedDocument<Component>;
type ComponentModelType = Model<
  Component,
  object,
  object,
  object,
  ComponentHydratedDocument
>;

/**
 * Mongoose schema for the external dependencies
 * @type {mongoose.Schema<ExternalDependency>}
 */
const externalDependencySchema: mongoose.Schema<ExternalDependency> =
  new mongoose.Schema<ExternalDependency>(
    {
      name: { type: String, required: true },
      ver: { type: String, default: "@latest" },
      type: { type: String },
    },
    { _id: false }
  );

/**
 * Mongoose schema for the local dependencies
 * @type {mongoose.Schema<LocalDependency>}
 */
const localDependencySchema: mongoose.Schema<LocalDependency> =
  new mongoose.Schema<LocalDependency>(
    {
      path: { type: String, required: true },
      cmp: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
    },
    { _id: false }
  );

/**
 * Mongoose schema for the component dependencies
 * @type {mongoose.Schema<Dependencies>}
 */
const dependenciesSchema: mongoose.Schema<Dependencies> =
  new mongoose.Schema<Dependencies>(
    {
      ext: [externalDependencySchema],
      lcl: [localDependencySchema],
    },
    { _id: false }
  );

/**
 * Mongoose schema for a component
 * @type {mongoose.Schema<Component,ComponentModelType>}
 */
const componentSchema: mongoose.Schema<Component, ComponentModelType> =
  new mongoose.Schema<Component, ComponentModelType>(
    {
      name: { type: String, required: true },
      size: { type: Number, required: true },
      outPath: { type: String, required: true },
      desc: String,
      deps: dependenciesSchema,
      lib: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Library",
        required: true,
      },
      cb: { type: mongoose.Schema.Types.ObjectId, ref: "Codeblock" },
    },
    { timestamps: { createdAt: "created", updatedAt: "updated" } }
  );

componentSchema.index({ lib: 1, name: 1, outPath: 1 }, { unique: true });

const ComponentModel =
  (mongoose.models.Component as Model<Component, ComponentModelType>) ||
  mongoose.model<Component, ComponentModelType>("Component", componentSchema);

export default ComponentModel;
