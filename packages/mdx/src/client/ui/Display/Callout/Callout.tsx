import { Card, GlassCard } from "@cubicsui/components";
import { icons } from "@cubicsui/icons/registry";
import { cn } from "@cubicsui/utils";
import styles from "./Callout.module.css";
import type { CalloutProps } from "./Callout.types";
import { calloutColors, calloutIcons } from "./Callout.utils";

export function Callout(props: CalloutProps) {
  const { type = "note", title, subtitle, icon, children } = props;

  const Icon = icon ? icons[icon as keyof typeof icons] : calloutIcons[type];
  const color = type && calloutColors[type];
  return (
    <GlassCard as={Card} color={color} role="note" className={cn(styles.root)}>
      <div className={styles.icon}>
        <Icon />
      </div>
      <div className={styles.title}>
        {title && <h1>{title}</h1>}
        {subtitle && <h2>{subtitle}</h2>}
      </div>
      <div className={styles.body}>{children}</div>
    </GlassCard>
  );
}
