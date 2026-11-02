"use client";

import { type RefObject, useEffect, useState } from "react";
import { useDelayedAction } from "../useDelayedAction/useDelayedAction";

export interface UseCopyActionReturn {
  copied: boolean;
  handleCopy: () => Promise<void>;
}
export interface UseCopyActionProps {
  text?: string;
  ref?: RefObject<HTMLElement | null>;
  delay?: number;
}
export function useCopyAction({
  text,
  ref,
  delay = 2000,
}: UseCopyActionProps): UseCopyActionReturn {
  const [copied, setCopied] = useState(false);
  const delayedAction = useDelayedAction();

  async function handleCopy(): Promise<void> {
    const t = text || ref?.current?.textContent;
    if (typeof window === "undefined" || t === undefined) return;
    try {
      await navigator.clipboard.writeText(t);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }
  useEffect(() => {
    if (copied) {
      delayedAction(() => setCopied(false), delay);
    }
  }, [delayedAction, delay, copied]);

  return { copied, handleCopy };
}
