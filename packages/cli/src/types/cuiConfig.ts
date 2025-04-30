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
 */

export interface CUIConfig {
  envOptions: {
    /**
     * Set to true if the project is using typescript,
     *
     * @remarks
     * This will be detected when you run
     * `cui init`
     * @default false
     */
    typescript: boolean;

    /**
     * The components style module's glob pattern.
     * if the component file is `abc.jsx` then the style for the component will be `abc.module.css`
     * @default "*.module.css"
     */
    stylePattern?: string;
    /**
     * The documentation file's glob pattern.
     * If the component file is `abc.jsx` then the documentation for the component will be `abc.md`
     * @default "*.md"
     */
    documentationPattern?: string;
  };
  databaseOptions: {
    /**
     * Name of the selected library in the database where the components can be found
     * @default "default"
     */
    libraryName: string;
    /**
     * baseUrl from tsconfig or jsconfig
     * @see https://www.typescriptlang.org/tsconfig#baseUrl
     *
     * @remarks
     * This will be detected when you run
     * `cui init`
     * @default "current working directory"
     */
    baseUrl?: string;
  };
  mods?: [];
}

/**
 * Defines an array of recognized configuration file names for the CubicsUI configuration system.
 *
 * This constant array contains the standard filenames that the configuration loader will search for when
 * attempting to locate and parse the application's configuration. Currently supports both JavaScript and
 * TypeScript configuration file formats.
 *
 * @remarks
 * - The configuration files are expected to be located in the project's root directory
 * - Supports `.mjs` and `.ts` extensions for maximum flexibility across different project setups
 */
export const configFiles = ["cui.config.mjs", "cui.config.ts"] as const;

/**
 * A type that represents the literal string types of valid configuration file names.
 *
 * Allows precise type checking and autocompletion for configuration file names throughout the application.
 *
 * @typeparam ConfigFile - A union type of the specific configuration file name strings
 */
export type ConfigFile = (typeof configFiles)[number];
