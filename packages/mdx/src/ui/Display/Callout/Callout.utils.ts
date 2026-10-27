import {
  InfoIcon,
  LightBulbIcon,
  MessageSquareWarningIcon,
  OctagonAlertIcon,
  TriangleAlertIcon,
} from "@cubicsui/icons";
import type { ComponentProps, ComponentType } from "react";
import type { CalloutProps } from "./Callout.types";

export const calloutIcons: Record<
  Required<CalloutProps>["type"],
  ComponentType<ComponentProps<"svg">>
> = {
  note: InfoIcon,
  tip: LightBulbIcon,
  important: MessageSquareWarningIcon,
  warning: TriangleAlertIcon,
  caution: OctagonAlertIcon,
};
