/**
 * Comprehensive configuration interface for the CubicsUI CLI.
 *
 * @description
 * Represents the full configuration schema that controls component generation and project setup.
 * This configuration allows fine-grained control over code generation, style management,
 * and project-specific preferences.
 *
 * @see {@link DetectedConfig} for automatically detected configuration subset
 * @see {@link configFiles} for supported configuration file names
 *
 * @example
 * // Example of a complete CUI configuration
 * const config: CUIConfig = {
 *   env: 'react',
 *   styleEngine: 'tailwind',
 *   typescript: true,
 *   renderComments: 'important'
 * };
 */
export default interface CUIConfig {
  /**
   * The generated code for the components depend on which `env` is selected
   *
   * @remarks
   * This will be detected when you run
   * `cui init`
   */
  env: "react" | "svelte" | "next";
  /**
   * Controls which flavor of css should be used when generating styles for the components,
   *
   * @remarks
   * This will be detected when you run
   * `cui init`
   */
  styleEngine: "css" | "scss" | "tailwind";
  /**
   * Set to true if the generated components should use typescript,
   *
   * @remarks
   * This will be detected when you run
   * `cui init`
   */
  typescript: boolean;
  /**
   * Controls the rendering of comments during component generation.
   * - `all` (default): Renders all comments, including detailed and minor explanations.
   * - `none`: Suppresses all comments during component generation.
   * - `important`: Renders only necessary or critical comments that provide essential context.
   * @default "none"
   */
  renderComments: "none" | "all" | "important";
}

/**
 * Subset of CUIConfig representing configuration parameters that can be automatically
 * detected from the project's existing structure and setup.
 *
 * @description
 * Provides a focused view of the most fundamental configuration parameters that
 * can be inferred without explicit user configuration. This type is derived from
 * the main CUIConfig interface, extracting only the key auto-detectable properties.
 *
 * @remarks
 * - Represents the minimum viable configuration information
 *
 * @see CUIConfig for the complete configuration interface
 */
export type DetectedConfig = Pick<
  CUIConfig,
  "env" | "styleEngine" | "typescript"
>;

/**
 * Defines an array of recognized configuration file names for the CubicsUI configuration system.
 *
 * This constant array contains the standard filenames that the configuration loader will search for when
 * attempting to locate and parse the application's configuration. Currently supports both JavaScript and
 * TypeScript configuration file formats.
 *
 * @remarks
 * - The configuration files are expected to be located in the project's root directory
 * - Supports `.js` and `.ts` extensions for maximum flexibility across different project setups
 *
 * @see {@link ConfigFile} for the type derived from this array
 */
export const configFiles = ["cui.config.js", "cui.config.ts"] as const;

/**
 * A type that represents the literal string types of valid configuration file names.
 *
 * This type is derived from the `configFiles` constant, allowing precise type checking
 * and autocompletion for configuration file names throughout the application.
 *
 * @typeparam ConfigFile - A union type of the specific configuration file name strings
 *
 */
export type ConfigFile = (typeof configFiles)[number];
