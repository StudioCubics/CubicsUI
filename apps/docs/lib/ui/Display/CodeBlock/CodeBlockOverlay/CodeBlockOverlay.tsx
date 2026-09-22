"use client";

import { useCopyAction } from "@cubicsui/hooks";
import type { CodeBlockClientProps } from "../CodeBlock.types";
import { Button, CheckIconAnimated, Tooltip } from "@cubicsui/components";
import { CopyIcon } from "@cubicsui/icons";
import styles from "./CodeBlockCopyButton.module.css";
import type { ReactElement } from "react";

export function CodeBlockOverlay({
  title,
  code,
}: {
  title: CodeBlockClientProps["title"];
  code: CodeBlockClientProps["code"];
}): ReactElement {
  const { copied, handleCopy } = useCopyAction({
    text: code,
  });
  return (
    <div>
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
  );
}
