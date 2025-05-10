("");

/**
 * Comprehensive configuration schema for the CubicsUI CLI. Represents the full configuration schema that controls component, library, and codeblock generation.
 */
export interface CUIConfig {
  /**
   * Options about the current project's environment.
   */
  envOptions: {
    /**
     * Set to true if the project is using TypeScript. This will be detected when you run `cui init`.
     */
    typescript: boolean;
    /**
     * The components style module's wildcard pattern. If the component file is in `./dir/abc.jsx` then the style for the component must be in `./dir/abc.module.css`.
     */
    styleModulePattern?: string;
    /**
     * The documentation file's wildcard pattern. If the component file is `./dir/abc.jsx` then the documentation for the component will be `./dir/abc.md`.
     */
    documentationPattern?: string;
  };
  /**
   * Options containing information about the database.
   */
  databaseOptions: {
    /**
     * The library that the current project is associated with in the database. This will also be used to create a library if the library doesnt exist.
     */
    library: {
      /**
       * Name of the selected library in the database where the components can be found. If the library doesn't exist then it is created in the database.
       */
      name: string;
      /**
       * This is used by cui to know where the root of the library is located. `baseUrl` is taken from the nearest `tsconfig.json` or `jsconfig.json`. If none of these exist then it defaults to current working directory.
       */
      baseUrl: string;
    };
  };
  /**
   * Optional mods array.
   */
  mods?: unknown[];
}
