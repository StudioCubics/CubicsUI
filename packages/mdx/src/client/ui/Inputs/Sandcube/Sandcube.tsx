import { extractText } from "@cubicsui/utils";
import { Children, isValidElement } from "react";
import type {
  SandcubeClientFile,
  SandcubeFileProps,
  SandcubeProps,
} from "./Sandcube.types";
import { SandcubeClient } from "./SandcubeClient/SandcubeClient";

export function Sandcube(props: SandcubeProps) {
  const { children, title, entry, ...rest } = props;
  // Runs on the server, where the fenced code is still a plain element tree
  const files: SandcubeClientFile[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const props = child.props as Partial<SandcubeFileProps>;
    if (!props.path) return;
    files.push({
      path: props.path,
      code: extractText(props.children).trim(),
      hidden: props.hidden,
      readOnly: props.readOnly,
    });
  });

  return <SandcubeClient files={files} title={title} entry={entry} {...rest} />;
}
