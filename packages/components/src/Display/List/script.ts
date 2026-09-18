export function script(storageKey: string): void {
  try {
    var stored = localStorage.getItem(storageKey);
    if (!stored) return;
    var explicit: Record<string, boolean> = JSON.parse(stored);
    var entries = Object.entries(explicit);
    for (var i = 0; i < entries.length; i++) {
      var el = document.getElementById(entries[i][0]);
      if (el)
        el.setAttribute("data-collapsed", entries[i][1] ? "true" : "false");
    }
  } catch (e) {
    // Unsupported
  }
}
