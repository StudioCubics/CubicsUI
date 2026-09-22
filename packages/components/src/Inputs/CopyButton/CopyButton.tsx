"use client";

import type { ReactElement } from "react";
import { Button } from "../Button/Button";
import type { ButtonProps } from "../Button/Button.types";
import { useCopyAction } from "@cubicsui/hooks";
import { CheckIconAnimated } from "../Checkbox/CheckboxIcons/CheckboxIcons";
import { CopyIcon } from "@cubicsui/icons";
import { Tooltip } from "../../Display/Tooltip/Tooltip";

export function CopyButton(
  props: { textToCopy: string } & ButtonProps,
): ReactElement {
  const { textToCopy, title, ...rest } = props;
  const { copied, handleCopy } = useCopyAction({ text: textToCopy });
  return (
    <Tooltip title={copied ? "Copied" : "Copy"} renderArrow>
      <Button
        {...rest}
        onClick={(e) => {
          handleCopy();
          rest.onClick?.(e);
        }}
      >
        {!copied ? <CopyIcon /> : <CheckIconAnimated />}
      </Button>
    </Tooltip>
  );
}
