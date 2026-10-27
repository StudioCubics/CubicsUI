import type { CardProps } from "@cubicsui/components";
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
export const calloutColors: Record<
  Required<CalloutProps>["type"],
  CardProps["color"]
> = {
  note: undefined,
  tip: "primary",
  important: "success",
  warning: "warn",
  caution: "error",
};
export const DEFAULT_CALLOUT_TYPES = [
  "note",
  "tip",
  "important",
  "warning",
  "caution",
] as const;

