"use client";

import type { ReactElement } from "react";
import type { ButtonProps } from "../../../Inputs/Button/Button.types";
import { useSidebarLayout } from "../SidebarLayout";
import { Button } from "../../../Inputs/Button/Button";
import { PanelLeftIcon } from "@cubicsui/icons";

export function SidebarToggle(props: ButtonProps): ReactElement {
  const { children = <PanelLeftIcon />, icon = true, ...rest } = props;
  const { toggleSidebar, size } = useSidebarLayout();
  return (
    <Button {...rest} size={size} icon={icon} onClick={toggleSidebar}>
      {children}
    </Button>
  );
}
