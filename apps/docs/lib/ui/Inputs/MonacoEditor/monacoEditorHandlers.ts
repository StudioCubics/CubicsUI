import {
  cubicsuiDarkTheme,
  cubicsuiLightTheme,
} from "@/lib/themes/cubicsui-monaco";
import type { Monaco } from "@monaco-editor/react";
import { registerJsxTokenizer } from "./monacoJSXTokenizer";

// Register themes once before mount
export function handleEditorBeforeMount(monaco: Monaco) {
  monaco.editor.defineTheme("cubicsui-dark", cubicsuiDarkTheme);
  monaco.editor.defineTheme("cubicsui-light", cubicsuiLightTheme);
  registerJsxTokenizer(monaco);
}

export async function handleEditorOnMount(editor: unknown, monaco: Monaco) {
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
    allowJs: true,
    typeRoots: ["node_modules/@types"],
  });

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
    diagnosticCodesToIgnore: [
      // Cannot find module 'xxx' or its corresponding type declarations.
      2307,
      // Cannot find name 'React'.
      2304,
      // Property 'className' does not exist on type 'Props'
      2339,
    ],
  });

  const reactTypes = await fetch(
    "https://unpkg.com/@types/react@latest/index.d.ts",
  ).then((r) => r.text());

  const reactJsxTypes = await fetch(
    "https://unpkg.com/@types/react@latest/jsx-runtime.d.ts",
  ).then((r) => r.text());

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    reactTypes,
    "file:///node_modules/@types/react/index.d.ts",
  );
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    reactJsxTypes,
    "file:///node_modules/@types/react/jsx-runtime.d.ts", // ✅ resolves 2875
  );
}
