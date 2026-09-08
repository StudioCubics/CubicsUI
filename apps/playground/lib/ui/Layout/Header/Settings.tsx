"use client";

import {
  Button,
  Card,
  GlassCard,
  Popover,
  Switch,
  ThemeToggle,
  useContrast,
} from "@cubicsui/components";
import { useMounted } from "@cubicsui/hooks";
import { SettingsIcon } from "@cubicsui/icons";

export function Settings() {
  const { mounted } = useMounted();
  const { contrast, setContrast } = useContrast();
  if (!mounted) return;
  return (
    <>
      <Button popoverTarget="settings_popover" icon>
        <SettingsIcon />
      </Button>
      <Popover id={"settings_popover"}>
        <GlassCard
          as={Card}
          elevation="high"
          className="column"
          fixedWidth="15vw"
        >
          <ThemeToggle
            variant="full"
            slotProps={{ button: { size: "sm", fullWidth: true } }}
          />
          <Switch
            size="sm"
            checked={contrast}
            onChange={(e, v) => setContrast(v)}
            label="High Contrast"
          />
          <Switch size="sm" label="Pointer Light" />
          <Switch size="sm" label="Disable Animations" />
        </GlassCard>
      </Popover>
    </>
  );
}
