"use client";

import * as React from "react";
import * as CubicsUI from "@cubicsui/components";
import { useMemo, useState, type ComponentType } from "react";
import { LiveError, LivePreview, LiveProvider } from "react-live";
import { transform } from "sucrase";
import { MonacoEditor } from "../../Inputs/MonacoEditor/MonacoEditor";
import { useMounted } from "@cubicsui/hooks";
import styles from "./Sandcube.module.css";

export interface SandcubeClientFile {
  path: string;
  code: string;
  hidden?: boolean;
  readOnly?: boolean;
}

export interface SandcubeClientProps {
  files: SandcubeClientFile[];
  title?: string;
  // Path of the file that renders the demo
  entry?: string;
}

interface SandcubeFileState {
  code: string;
  // Not shown in the tabs
  hidden: boolean;
  // Not editable in the editor
  readOnly: boolean;
  // Original code, for reset / "modified" indicators
  initialCode: string;
}

type SandcubeFiles = Record<string, SandcubeFileState>;

// Packages available to every demo by default
const baseImports: Record<string, unknown> = {
  react: React,
  "@cubicsui/components": CubicsUI,
};

const EXTENSIONS = [
  "",
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".css",
  ".scss",
  ".less",
  ".json",
  ".html",
  ".md",
  ".mdx",
  ".yml",
  ".yaml",
];

// Resolves a relative/absolute request against the importing file, e.g. ("/App.tsx", "./data") -> "/data"
function resolvePath(from: string, request: string) {
  const parts = request.startsWith("/") ? [""] : from.split("/").slice(0, -1);
  for (const segment of request.split("/")) {
    if (segment === "." || segment === "") continue;
    if (segment === "..") parts.pop();
    else parts.push(segment);
  }
  return parts.join("/") || "/";
}

// Compiles the entry file and everything it imports, and returns the entry's exports.
// Modules are loaded lazily on `require`, so files can import each other in any order.
function runFiles(files: SandcubeFiles, entry: string) {
  const cache: Record<string, Record<string, unknown>> = {};

  const makeRequire = (from: string) => (request: string) => {
    if (request in baseImports) return baseImports[request];
    if (request.startsWith(".") || request.startsWith("/")) {
      const base = resolvePath(from, request);
      const found = EXTENSIONS.map((ext) => base + ext).find(
        (candidate) => candidate in files,
      );
      if (found) return load(found);
    }
    throw new Error(`Cannot find module '${request}' imported from ${from}`);
  };

  const load = (path: string): Record<string, unknown> => {
    if (path in cache) return cache[path];
    const module = { exports: {} as Record<string, unknown> };
    // Registered before running so circular imports don't loop forever
    cache[path] = module.exports;
    // css files resolve to an empty module
    if (/\.(tsx?|jsx?|mjs|cjs)$/.test(path)) {
      const { code } = transform(files[path].code, {
        transforms: ["typescript", "jsx", "imports"],
        filePath: path,
        production: true, // Skips the __self/__source props that trigger React's "outdated JSX transform" warning
      });
      new Function("require", "exports", "module", "React", code)(
        makeRequire(path),
        module.exports,
        module,
        React,
      );
    }
    cache[path] = module.exports;
    return module.exports;
  };

  if (!(entry in files)) throw new Error(`Entry file '${entry}' not found`);
  return load(entry);
}

export function SandcubeClient({
  files: initialFiles,
  title,
  entry = "/App.tsx",
}: SandcubeClientProps) {
  const [files, setFiles] = useState<SandcubeFiles>(() =>
    Object.fromEntries(
      initialFiles.map((f) => [
        f.path,
        {
          code: f.code,
          hidden: f.hidden ?? false,
          readOnly: f.readOnly ?? false,
          initialCode: f.code,
        },
      ]),
    ),
  );
  const visibleFiles = Object.keys(files).filter((path) => !files[path].hidden);
  const [activeFile, setActiveFile] = useState(
    visibleFiles.includes(entry) ? entry : visibleFiles[0],
  );
  const { mounted } = useMounted();

  // Recompile whenever any file changes. The runner always renders the entry
  // file; activeFile only affects the editor.
  const { Demo, compileError } = useMemo(() => {
    try {
      const exports = runFiles(files, entry);
      const Component = exports.default as ComponentType | undefined;
      if (!Component) throw new Error(`${entry} needs a default export`);
      return { Demo: Component, compileError: null };
    } catch (e) {
      return {
        Demo: () => null,
        compileError: e instanceof Error ? e.message : String(e),
      };
    }
  }, [files, entry]);

  // Memoized so react-live only re-transpiles when the component changes
  const scope = useMemo(() => ({ Demo }), [Demo]);

  return (
    <div className={styles.root}>
      <div className={styles.runner}>
        {mounted && (
          <LiveProvider code="React.createElement(Demo)" scope={scope}>
            <LivePreview />
            <LiveError />
          </LiveProvider>
        )}
        {mounted && compileError && <pre>{compileError}</pre>}
      </div>
      <MonacoEditor
        id={title}
        height={"30vh"}
        value={files[activeFile]?.code}
        onChange={(value) =>
          setFiles((prev) => ({
            ...prev,
            [activeFile]: { ...prev[activeFile], code: value ?? "" },
          }))
        }
        options={{ readOnly: files[activeFile]?.readOnly }}
        tabsMgr={{ activeFile, visibleFiles, setActiveFile }}
      />
    </div>
  );
}
