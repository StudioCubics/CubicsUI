import { GlassCard } from "@cubicsui/components";
import { cn } from "@cubicsui/utils";
import type { ComponentProps, ComponentType, ReactNode } from "react";
import styles from "./Callout.module.css";

export interface CalloutProps {
  type?: "info" | "warn" | "success" | "error" | "idea";
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

const Icons: Record<
  Required<CalloutProps>["type"],
  ComponentType<ComponentProps<"svg">>
> = {
  info: InfoIcon,
  warn: TriangleAlertIcon,
  error: CircleXIcon,
  success: TrophyIcon,
  idea: LightBulbIcon,
};
export function Callout(props: CalloutProps) {
  const { type = "info", title, subtitle, children } = props;
  const Icon = Icons[type];
  return (
    <GlassCard role="note" className={cn(styles.root, styles[type])}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <Icon />
        </div>
        <div className={styles.title}>
          {title && <h1>{title}</h1>}
          {subtitle && <h2>{subtitle}</h2>}
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </GlassCard>
  );
}
