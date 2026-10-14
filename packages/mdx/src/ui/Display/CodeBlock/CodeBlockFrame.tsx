import type { ReactNode } from "react";
import styles from "./CodeBlock.module.css";
import { cn } from "@cubicsui/utils";
import { CopyButton } from "@cubicsui/components";

type CodeBlockFrameProps = {
  icon?: ReactNode;
  title?: string;
  code: string;
  children: ReactNode;
};

export function CodeBlockFrame(props: CodeBlockFrameProps) {
  const { icon, title, code, children } = props;
  return (
    <div className={styles.root}>
      {/* Header div */}
      {(icon || title) && (
        <div className={cn(styles.header)}>
          <span className={cn(styles.icon)}></span>
          {title}
        </div>
      )}
      {/* Main div */}
      <div className={cn(styles.main)}>
        {/* Overlay div */}
        <div className={cn(styles.overlay)}>
          <div className={cn(styles.overlayActions)}>
            <CopyButton
              textToCopy={code}
              size="xs"
              variant="outlined"
              title={title}
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
