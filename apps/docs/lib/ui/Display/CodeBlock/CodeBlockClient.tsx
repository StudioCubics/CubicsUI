"use client";

import styles from "./CodeBlock.module.css";
import { Button, CheckIconAnimated, Tooltip } from "@cubicsui/components";
import { CopyIcon } from "@cubicsui/icons";
import { useCopyAction } from "@cubicsui/hooks";
import { MonacoEditor } from "../../Inputs/MonacoEditor/MonacoEditor";
import type { CodeBlockClientProps } from "./CodeBlock.types";
import type { ReactElement } from "react";

export function CodeBlockClient(props: CodeBlockClientProps): ReactElement {
  const {
    code,
    icon,
    title,
    name,
    className,
    slotProps = {},
    ref,
    ...rest
  } = props;

  const hasHeader = !!title;

  const { copied, handleCopy } = useCopyAction({
    text: code,
  });

  return (
    <div className={styles.root} {...slotProps.root}>
      <div className={styles.overlayContainer}>
        {icon && (
          <span
            className={styles.icon}
            dangerouslySetInnerHTML={{ __html: icon }}
            {...slotProps.icon}
          ></span>
        )}
        <Tooltip
          title={
            copied
              ? `Copied${title ? ` ${title}` : ""}!`
              : `Copy${title ? ` ${title}` : ""}`
          }
          renderArrow
          anchorOrigin="center left"
          transformOrigin="center right"
        >
          <Button
            size="sm"
            variant="outlined"
            icon
            className={styles.copy}
            onClick={handleCopy}
          >
            {!copied ? <CopyIcon /> : <CheckIconAnimated />}
          </Button>
        </Tooltip>
      </div>
      {hasHeader && (
        <header className={styles.header} {...slotProps.header}>
          <span className={styles.headerContent} {...slotProps.headerContent}>
            {title}
          </span>
        </header>
      )}
      <MonacoEditor
        id={title}
        defaultValue={code}
        height={"10vh"}
        options={{ readOnly: true, automaticLayout: true }}
      />
    </div>
  );
}
