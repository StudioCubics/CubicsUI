import { HydratedDocument, Model, Types } from "mongoose";
import { Dependencies } from "./dependencies.js";
import { Codeblock } from "./codeblock.js";
import { Library } from "./library.js";
import { Expand, SinglePopulatedField } from "../utils/typeUtils.js";

/**
 * The component is the main building block of CubicsUI
 */
export interface Component {
  /**
   * The name of the component, this will be set and used by the user to download the component to their projects
   * @remarks This is unique to a component in a {@link Library | Library}, so only one component can have the same name in a specific library.
   */
  name: string;
  /**
   * The path relative to the {@link Library.baseUrl | rootPath}, where the component should be output to while downloading.
   * @remarks This is unique to a component in a library, so only one component can have the same name in a specific library.
   */
  outPath: string;
  /**
   * Short description of the component
   */
  desc?: string;
  /**
   * External and local dependencies of the component
   */
  deps: Dependencies;
  /**
   * The library that the component belongs to
   */
  lib: Types.ObjectId;
  /**
   * Contains the main code for the component
   * Some example of script files are
   * - Example.js
   * - Example.ts
   * - Example.tsx
   * - Example.jsx
   * - Example.svelte
   */
  script: Types.ObjectId;
  /**
   * Contains styles if there are styles associated with the component,
   * Association is created by the style file having the same name as the script with different extension.
   * Some example of styles files are
   * - Example.css
   * - Example.scss
   * - Example.module.css
   */
  styles?: Types.ObjectId;
  /**
   * Contains the documentation associated with the component,
   * Association is created by the doc file having the same name as the script with different extension.
   * Some example of documentation files are
   * - Example.md
   * - Example.mdx
   */
  doc?: Types.ObjectId;
}

/**
 * Component type without any of its foreign keys
 */
export type ForeignKeyOmittedComponent = Omit<
  Component,
  "lib" | "script" | "styles" | "doc"
>;

/**
 * Component with all the foreign keys populated
 */
export type ComponentPopulated = Expand<
  ForeignKeyOmittedComponent & {
    lib: Library;
    script: Codeblock;
    styles?: Codeblock;
    doc?: Codeblock;
  }
>;

/**
 * Component type with the `lib` field populated
 */
export type ComponentLibraryPopulated = Expand<
  SinglePopulatedField<Omit<Component, "lib">, ComponentPopulated, "lib">
>;

/**
 * Component type with the `script` field populated
 */
export type ComponentScriptPopulated = Expand<
  SinglePopulatedField<Omit<Component, "script">, ComponentPopulated, "script">
>;
/**
 * Component type with the `styles` field populated
 */
export type ComponentStylesPopulated = Expand<
  SinglePopulatedField<Omit<Component, "styles">, ComponentPopulated, "styles">
>;
/**
 * Component type with the `doc` field populated
 */
export type ComponentDocPopulated = Expand<
  SinglePopulatedField<Omit<Component, "doc">, ComponentPopulated, "doc">
>;

export type ComponentDocument = HydratedDocument<Component>;
export type ComponentModelType = Model<Component>;
