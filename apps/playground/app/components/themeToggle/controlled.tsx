"use client";

import { Card, ThemeToggle, type Theme } from "@cubicsui/components";
import { useState } from "react";

export function Controlled() {
  const [current, setCurrent] = useState<"light" | "system" | "dark">("light");

  return (
    <Card className="column">
      <ThemeToggle
        variant="full"
        currentTheme={current as Theme}
        themeObject={{
          light: { text: "Light Mode", onClick: () => setCurrent("system") },
          system: { text: "System Mode", onClick: () => setCurrent("dark") },
          dark: { text: "Dark Mode", onClick: () => setCurrent("light") },
        }}
      />
      <p>Current theme is: {current}</p>
    </Card>
  );
}
