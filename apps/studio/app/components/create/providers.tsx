"use client";

import { sampleTsComponentReact } from "@/library/constants/sampleCodeBlocks";
import { analyzeCodeDependencies } from "@/library/functions/dependencyAnalyser";
import { codeblocks, components, Dependencies, projects } from "@cubicsui/db";
import {
  createContext,
  ReactNode,
  useActionState,
  useContext,
  useEffect,
  useState,
} from "react";
import { createComponentAction } from "../actions";

interface ComponentFormDefaultStateProps {
  project: projects;
  component?: components | null;
  codeblocks?: codeblocks | null;
}

interface ComponentFormContextProps
  extends ReturnType<typeof useComponentFormStates>,
    ComponentFormDefaultStateProps {}

interface ComponentFormProviderProps extends ComponentFormDefaultStateProps {
  children: ReactNode;
}

export const ComponentFormContext =
  createContext<ComponentFormContextProps | null>(null);

export function useComponentForm() {
  const c = useContext(ComponentFormContext);
  if (!c)
    throw new Error("Components must be wrapped in <ComponentFormProvider/>");
  return c;
}

export default function ComponentFormProvider({
  children,
  ...defaults
}: ComponentFormProviderProps) {
  const componentFormState = useComponentFormStates(defaults);
  // { "@/*": ["./*"] }
  return (
    <ComponentFormContext.Provider
      value={{ ...componentFormState, ...defaults }}
    >
      {children}
    </ComponentFormContext.Provider>
  );
}
function useComponentFormStates({
  project,
  codeblocks,
  component,
}: ComponentFormDefaultStateProps) {
  const [name, setName] = useState(component?.name ?? "");
  const [desc, setDesc] = useState(component?.desc ?? "");
  const [outFile, setOutFile] = useState(component?.outFile ?? "");
  const [outDir, setOutDir] = useState(component?.outDir ?? "");
  const [tags, setTags] = useState<string[]>(component?.tags ?? []);
  const [deps, setDeps] = useState<Dependencies>(
    component?.deps ?? { ext: [], lcl: [] }
  );
  const [scriptCode, setScriptCode] = useState<string | undefined>(
    codeblocks?.script ?? sampleTsComponentReact
  );
  const [styleCode, setStyleCode] = useState<string | undefined>(
    codeblocks?.styles ?? undefined
  );
  const [scriptIncludesStyles, setScriptIncludesStyles] = useState(
    !!codeblocks?.styles
  );

  const [formState, formAction, formPending] = useActionState(
    createComponentAction,
    {}
  );

  useEffect(() => {
    if (name) {
      let extension = project.lang == "typescript" ? ".tsx" : ".jsx";
      setOutFile(`${name}${extension}`);
    }
  }, [name, project]);

  function analyseDependencies() {
    const newDeps = analyzeCodeDependencies(scriptCode, { "@/*": ["./*"] });
    if (newDeps.ext.length !== 0 || newDeps.lcl.length !== 0) {
      setDeps(newDeps);
    }
    console.log("newDeps", newDeps);
  }

  return {
    name,
    desc,
    outFile,
    outDir,
    tags,
    deps,
    scriptCode,
    styleCode,
    scriptIncludesStyles,
    formState,
    formPending,
    setName,
    setDesc,
    setOutFile,
    setOutDir,
    setTags,
    setDeps,
    setScriptCode,
    setStyleCode,
    setScriptIncludesStyles,
    analyseDependencies,
    formAction,
  };
}
