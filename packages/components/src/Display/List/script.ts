export function script(storageKey: string): void {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) return;
    const explicit = JSON.parse(stored) as Record<string, boolean>;
    const entries = Object.entries(explicit);
    for (let i = 0; i < entries.length; i++) {
      const el = document.getElementById(entries[i][0]);
      if (el)
        el.setAttribute("data-collapsed", entries[i][1] ? "true" : "false");
    }
  } catch {
    // Unsupported
  }
}
