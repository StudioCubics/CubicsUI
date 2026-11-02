import { useId as reactUseId } from "react";
/** Extended version of reacts useId that resolves to a fallback if provided */
export function useId(fallbackId?: string): string {
  const generatedId = reactUseId();
  return fallbackId ?? generatedId;
}
