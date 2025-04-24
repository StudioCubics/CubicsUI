import Component from "@/types/component";
import {
  Dependencies,
  ExternalDependency,
  LocalDependency,
} from "@/types/dependencies";
import { HydratedDocument, Model, Schema, model, models } from "mongoose";

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
 * @type {Schema<ExternalDependency>}
 */
const externalDependencySchema: Schema<ExternalDependency> =
  new Schema<ExternalDependency>(
    {
      name: { type: String, required: true },
      ver: { type: String, default: "@latest" },
      type: { type: String },
    },
    { _id: false }
  );

/**
 * Mongoose schema for the local dependencies
 * @type {Schema<LocalDependency>}
 */
const localDependencySchema: Schema<LocalDependency> =
  new Schema<LocalDependency>(
    {
      path: { type: String, required: true },
      cmp: { type: Schema.Types.ObjectId, ref: "Module" },
    },
    { _id: false }
  );

/**
 * Mongoose schema for the component dependencies
 * @type {Schema<Dependencies>}
 */
const dependenciesSchema: Schema<Dependencies> = new Schema<Dependencies>(
  {
    ext: [externalDependencySchema],
    lcl: [localDependencySchema],
  },
  { _id: false }
);

/**
 * Mongoose schema for a component
 * @type {Schema<Component,ComponentModelType>}
 */
const componentSchema: Schema<Component, ComponentModelType> = new Schema<
  Component,
  ComponentModelType
>(
  {
    name: { type: String, required: true },
    size: { type: Number, required: true },
    outPath: { type: String, required: true },
    desc: String,
    deps: dependenciesSchema,
    lib: {
      type: Schema.Types.ObjectId,
      ref: "Library",
      required: true,
    },
    cb: { type: Schema.Types.ObjectId, ref: "Codeblock" },
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);

componentSchema.index({ lib: 1, name: 1, outPath: 1 }, { unique: true });

const ComponentModel =
  (models.Component as Model<Component, ComponentModelType>) ||
  model<Component, ComponentModelType>("Component", componentSchema);

export default ComponentModel;
