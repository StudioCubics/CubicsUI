# @cubicsui/cli

## 1.2.10

### Patch Changes

- Checking if release workflow respects the paths for "\*\*/CHANGELOG.md" on push
- Updated dependencies
  - @cubicsui/db@1.0.6
  - @cubicsui/gen@1.0.8

## 1.2.9

### Patch Changes

- Added additional files to ignore while publishing
- Updated dependencies
  - @cubicsui/db@1.0.5
  - @cubicsui/gen@1.0.7

## 1.2.8

### Patch Changes

- Added npmignore to @cubicsui/gen as it also wasnt including the dist directory in the published package in npm
- Updated dependencies
  - @cubicsui/db@1.0.4
  - @cubicsui/gen@1.0.6

## 1.2.7

### Patch Changes

- Moved npmignore to cli as it wasnt working in the root of the monorepo
- Updated dependencies
  - @cubicsui/db@1.0.3
  - @cubicsui/gen@1.0.5

## 1.2.6

### Patch Changes

- Added npmignore as it was ignoring the dist folders
- Updated dependencies
  - @cubicsui/db@1.0.2
  - @cubicsui/gen@1.0.4

## 1.2.5

### Patch Changes

- Changes across dependecies
- Updated dependencies
  - @cubicsui/db@1.0.1
  - @cubicsui/gen@1.0.3

## 1.2.4

### Patch Changes

- Releasing major version of @cubicsui/db and patching @cubicsui/cli and @cubicsui/gen
- Updated dependencies
  - @cubicsui/gen@1.0.2

## 1.2.3

### Patch Changes

- Added gen to cli
- Updated dependencies
  - @cubicsui/gen@1.0.1

## 1.2.2

### Patch Changes

- New package called "gen" created this is where all the code which will create the individual components reside.

## 1.2.1

### Patch Changes(Experimental)

- Added new command "create" which allows users to create a new component using `npx cui create <component>`

## 1.2.0

### Minor Changes

- Added ability to create cui.config.js if tsconfig is not found

## 1.1.3

### Patch Changes

- changed zod from devDependency to dependency

## 1.1.2

### Patch Changes

- fixed tsconfig

## 1.1.1

### Patch Changes

- fixed wrong bin imports and package.json reference

## 1.1.0

### Minor Changes

- Renamed src/index.js to src/main.js
- Renamed bin/index.js to bin/main.js
- Added exports in package.json for config/index.js
- Modified tsconfig to be more appropriate for the project
- Added new defineConfig function

## 1.0.2

### Patch Changes

- changed ESM to CJS in bin

## 1.0.1

### Patch Changes

- fixed small setup issues
