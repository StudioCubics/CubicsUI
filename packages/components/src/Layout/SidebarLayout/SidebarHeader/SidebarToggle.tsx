"use client";

import { PanelLeftIcon } from "@cubicsui/icons";
import type { ReactElement } from "react";
import { Button } from "../../../Inputs/Button/Button";
import type { ButtonProps } from "../../../Inputs/Button/Button.types";
import { useSidebarLayout } from "../SidebarLayout";

export function SidebarToggle(props: ButtonProps): ReactElement {
  const { children = <PanelLeftIcon />, icon = true, ...rest } = props;
  const { toggleSidebar, size } = useSidebarLayout();
  return (
    <Button {...rest} size={size} icon={icon} onClick={toggleSidebar}>
      {children}
    </Button>
  );
}
