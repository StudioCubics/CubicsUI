"use client";

import { useCopyAction } from "@cubicsui/hooks";
import { CopyIcon, DrawCheckIcon } from "@cubicsui/icons";
import type { ReactElement } from "react";
import { Tooltip } from "../../Display/Tooltip/Tooltip";
import { Button } from "../Button/Button";
import type { ButtonProps } from "../Button/Button.types";

export function CopyButton(
  props: { textToCopy: string } & ButtonProps,
): ReactElement {
  const { textToCopy, title, ...rest } = props;
  const { copied, handleCopy } = useCopyAction({ text: textToCopy });
  return (
    <Tooltip title={title ?? (copied ? "Copied" : "Copy")} renderArrow>
      <Button
        {...rest}
        icon
        onClick={(e) => {
          void handleCopy().finally(() => {
            rest.onClick?.(e);
          });
        }}
      >
        {!copied ? <CopyIcon /> : <DrawCheckIcon />}
      </Button>
    </Tooltip>
  );
}
