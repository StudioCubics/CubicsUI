"use client";

import { Kbd } from "@cubicsui/components";
import { useDelayedAction } from "@cubicsui/hooks";
import { useState } from "react";

const initial = {
  key: "",
  code: "",
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
  metaKey: false,
};
export function KeyboardEventTest() {
  const { delayAction, clearDelay } = useDelayedAction();
  const [eventInfo, setEventInfo] = useState(initial);

  return (
    <section>
      <h2>Keyboard event test</h2>

      <input
        placeholder="Press any key here..."
        onKeyDown={(e) => {
          setEventInfo({
            key: e.key,
            code: e.code,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            altKey: e.altKey,
            metaKey: e.metaKey,
          });
          clearDelay();
          delayAction(() => setEventInfo(initial), 3000);
        }}
      />

      <pre>{JSON.stringify(eventInfo, null, 2)}</pre>

      <Kbd
        fitContent
        realistic
        size="xl"
        keys={[eventInfo.key || "Press a key"]}
      />
    </section>
  );
}
