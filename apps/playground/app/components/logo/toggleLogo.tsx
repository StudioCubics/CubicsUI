"use client";
import { useState } from "react";
import { Button, Logo } from "@cubicsui/components";
import { logoBaseProps } from "./logoAssets";

/**
 * Toggles between the three states at runtime so the
 * scale/opacity transitions on both <g> groups can be checked.
 */
export function ToggleLogo() {
  const [mode, setMode] = useState<"full" | "favicon" | "text">("full");

  return (
    <section>
      <div>
        <Logo
          {...logoBaseProps}
          onlyFavicon={mode === "favicon"}
          onlyText={mode === "text"}
          height={60}
        />
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button
          variant={mode === "full" ? "contained" : "outlined"}
          onClick={() => setMode("full")}
        >
          Full
        </Button>
        <Button
          variant={mode === "favicon" ? "contained" : "outlined"}
          onClick={() => setMode("favicon")}
        >
          onlyFavicon
        </Button>
        <Button
          variant={mode === "text" ? "contained" : "outlined"}
          onClick={() => setMode("text")}
        >
          onlyText
        </Button>
      </div>
      <p>
        Current state: <code>{mode}</code>
      </p>
    </section>
  );
}
