import { ObjectId } from "mongoose";

/**
 * External dependencies are dependencies installed in the project
 */
export interface ExternalDependency {
  /**
   * Dependency name
   */
  name: string;
  /**
   * Dependency version
   * @default "@latest"
   */
  ver?: string;
  /**
   * Dependency type
   */
  type?: "dev" | "peer" | null;
}
/**
 * Local dependencies are local file modules
 */
export interface LocalDependency {
  /**
   * The path as written in the local dependency file
   * @description
   * given a local dependency
   * `import lcldep from "./lcldep"`
   *
   * then
   * `"./lcldep"` is the value
   */
  value: string;
  /**
   * Path of the file relative to rootPath
   * @description
   * given a local dependency
   * `import lcldep from "./lcldep"`
   *
   * then
   * `"relative/path/from/root/to/lcldep"` is the path
   */
  path: string;
  /**
   * Id of the component in the database
   */
  cmp: ObjectId | null;
}
export interface Dependencies {
  ext: ExternalDependency[];
  lcl: LocalDependency[];
}
