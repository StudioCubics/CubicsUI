/**
 * Comprehensive configuration interface for the CubicsUI CLI.
 * Represents the full configuration schema that controls component,library and codeblock generation
 */
export interface CUIConfig {
  /**
   * Options about the current projects environment.
   */
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
     * The components style module's wildcard pattern.
     * if the component file is in `./dir/abc.jsx` then the style for the component must be in `./dir/abc.module.css`
     * @default "*.module.css"
     */
    styleModulePattern?: string;
    /**
     * The documentation file's wildcard pattern.
     * If the component file is `./dir/abc.jsx` then the documentation for the component will be `./dir/abc.md`
     * @default "*.md"
     */
    documentationPattern?: string;
  };
  /**
   * Options containing information about the library, with which the components are associated.
   */
  libraryOptions: {
    /**
     * Name of the selected library in the database where the components can be found,
     * if the library doesnt exist then it is created in the database
     * @default "default"
     */
    libraryName: string;
    /**
     * This is used by cui to know where the root of the library is located,
     * `baseUrl` is taken from the nearest `tsconfig.json` or `jsconfig.json`,
     * if none of these exist then it defaults to current working directory
     * @see https://www.typescriptlang.org/tsconfig#baseUrl
     *
     * @remarks
     * This will be detected when you run
     * `cui init`
     * @default "."
     */
    baseUrl: string;
  };
  mods?: [];
}

/**
 * Defines an array of recognized configuration file names for the CubicsUI configuration.
 *
 * The configuration files are expected to be located in the project's root directory
 */
export const configFiles = ["cui.config.mjs", "cui.config.ts"] as const;

/**
 * A type that represents the literal string types of valid configuration file names.
 */
export type ConfigFile = (typeof configFiles)[number];
