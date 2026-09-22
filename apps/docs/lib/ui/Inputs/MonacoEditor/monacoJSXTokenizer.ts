// monacoJsxTokenizer.ts
import type { Monaco } from "@monaco-editor/react";
import type { languages } from "monaco-editor";

type Rule = languages.IMonarchLanguageRule;
type BuiltIn = { language: languages.IMonarchLanguage };

// JSX opens only where an expression can start (avoids clashing with generics like Array<T>)
const openTag = { token: "delimiter.tag", next: "@jsxTagName" };
const jsxStart = [
  [/(return)(\s*)(<)(?=[A-Za-z_$>])/, ["keyword", "", openTag]],
  [/(\()(\s*)(<)(?=[A-Za-z_$>])/, ["delimiter.parenthesis", "", openTag]],
  [
    /(=>|&&|\|\||\?\?|[=?:,])(\s*)(<)(?=[A-Za-z_$>])/,
    ["delimiter", "", openTag],
  ],
  [/^(\s*)(<)(?=[A-Za-z_$>])/, ["", openTag]], // first token on a line, e.g. after `return (`
] as Rule[];

const jsxStates: Record<string, Rule[]> = {
  // <div / <Button / <> — tag name
  jsxTagName: [
    [/[A-Z][\w$.]*/, { token: "type.identifier", switchTo: "@jsxTag" }],
    [/[a-z_$][\w$-]*/, { token: "tag", switchTo: "@jsxTag" }],
    [/(?=>)/, { token: "", switchTo: "@jsxTag" }],
  ],
  // inside the opening tag — attributes
  jsxTag: [
    [/\/>/, { token: "delimiter.tag", next: "@pop" }],
    [/>/, { token: "delimiter.tag", switchTo: "@jsxChildren" }],
    [/[a-zA-Z_$][\w$:-]*/, "attribute.name"],
    [/=/, "delimiter"],
    [/"[^"]*"/, "attribute.value"],
    [/'[^']*'/, "attribute.value"],
    [/\{/, { token: "delimiter.curly", next: "@jsxExpr" }],
    { include: "@whitespace" },
  ],
  // between tags
  jsxChildren: [
    [/<\//, { token: "delimiter.tag", switchTo: "@jsxCloseTag" }],
    [/<(?=[A-Za-z_$>])/, { token: "delimiter.tag", next: "@jsxTagName" }],
    [/\{/, { token: "delimiter.curly", next: "@jsxExpr" }],
    [/[^<{]+/, "jsx-text"],
  ],
  // </div>
  jsxCloseTag: [
    [/[A-Z][\w$.]*/, "type.identifier"],
    [/[a-z_$][\w$-]*/, "tag"],
    [/>/, { token: "delimiter.tag", next: "@pop" }],
    { include: "@whitespace" },
  ],
  // {...} containers: normal TS + nested braces + nested JSX
  jsxExpr: [
    [/\{/, { token: "delimiter.curly", next: "@jsxExpr" }],
    [/\}/, { token: "delimiter.curly", next: "@pop" }],
    ...jsxStart,
    { include: "common" },
  ],
};

// Call in beforeMount. Patches the lazily loaded built-in grammars in place.
export function registerJsxTokenizer(monaco: Monaco) {
  for (const id of ["typescript", "javascript"]) {
    const lang = monaco.languages
      .getLanguages()
      .find((l: { id: string }) => l.id === id) as
      { loader?: () => Promise<BuiltIn> } | undefined;

    lang?.loader?.().then(({ language }) => {
      const tokenizer = language.tokenizer;
      if (tokenizer.jsxTag) return; // already patched (onMount runs per editor)
      tokenizer.root.unshift(...jsxStart);
      Object.assign(tokenizer, jsxStates);
      monaco.languages.setMonarchTokensProvider(id, language);
    });
  }
}
