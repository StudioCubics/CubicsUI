import { ObjectId } from "mongoose";

/**
 * External dependencies are dependencies installed in the project
 */
export interface ExternalDependency {
  name: string;
  ver?: string;
  type?: "dev" | "peer";
}
export interface LocalDependency {
  path: string;
  cmp: ObjectId;
}
export interface Dependencies {
  ext: ExternalDependency[];
  lcl: LocalDependency[];
}
