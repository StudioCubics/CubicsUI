"use client";

import { Chip } from "@cubicsui/components";

export function OnClose() {
  return (
    <section>
      <Chip onClose={() => alert("Closed")}>This is a chip with onClose</Chip>
      <Chip onClose={() => alert("Closed")} variant="outlined">
        This is a chip with onClose
      </Chip>
    </section>
  );
}
