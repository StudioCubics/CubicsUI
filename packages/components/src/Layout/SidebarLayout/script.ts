import type { SidebarScriptProps } from "./SidebarLayout.types";

export const script = ({
  storageKey,
  defaultClosed,
  containerId,
}: Required<SidebarScriptProps>): void => {
  try {
    const SLOTS = [
      "sidebar-header",
      "sidebar-footer",
      "sidebar-body",
      "sidebar",
    ] as const;

    const stored = localStorage.getItem(storageKey);
    const value = stored !== null ? JSON.parse(stored) : !defaultClosed;

    const container = document.getElementById(containerId);
    if (!container) return;
    let matches: Record<(typeof SLOTS)[number], Element | undefined> = {
      "sidebar-header": undefined,
      "sidebar-footer": undefined,
      "sidebar-body": undefined,
      sidebar: undefined,
    };

    SLOTS.forEach((slot) => {
      const slctr = `[data-slot="${slot}"]`;
      const match = container.querySelector(slctr);
      matches = { ...matches, [slot]: match };
    });

    container.setAttribute("data-open", String(value));
    Object.values(matches).forEach((el) => {
      if (!el) return;
      el.setAttribute("data-open", String(value));
    });
  } catch (e) {}
};
