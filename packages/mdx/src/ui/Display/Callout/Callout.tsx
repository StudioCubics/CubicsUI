import { GlassCard } from "@cubicsui/components";
import { cn } from "@cubicsui/utils";
import styles from "./Callout.module.css";
import type { CalloutProps } from "./Callout.types";
import { calloutIcons } from "./Callout.utils";

export function Callout(props: CalloutProps) {
  const { type = "note", title, subtitle, children } = props;
  const Icon = calloutIcons[type];
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
