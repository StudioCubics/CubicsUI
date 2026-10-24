export function script(storageKey: string): void {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) return;
    const explicit: Record<string, boolean> = JSON.parse(stored);
    const entries = Object.entries(explicit);
    for (let i = 0; i < entries.length; i++) {
      // TODO change this to get from rootElement instead of document
      let el = document.getElementById(entries[i][0]);
      if (el) el.setAttribute("data-active", entries[i][1] ? "true" : "false");
    }
  } catch (_) {
    // Unsupported
  }
}
