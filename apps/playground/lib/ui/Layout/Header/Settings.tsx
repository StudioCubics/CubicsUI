"use client";

import {
  Button,
  Card,
  GlassCard,
  List,
  ListItem,
  Popover,
  Switch,
  ThemeToggle,
  useContrast,
  usePointerLight,
  useTheme,
} from "@cubicsui/components";
import { useMounted } from "@cubicsui/hooks";
import { SettingsIcon } from "@cubicsui/icons";

export function Settings() {
  const { mounted } = useMounted();
  const { theme } = useTheme();
  const { contrast, setContrast } = useContrast();
  const { pointerLight, setPointerLight } = usePointerLight();
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
          fixedWidth="min(250px, 80dvw)"
        >
          <List size="sm">
            <ListItem>
              <ThemeToggle
                variant="full"
                slotProps={{ button: { size: "sm", fullWidth: true } }}
              />
            </ListItem>
            <ListItem
              action={
                <Switch
                  size="sm"
                  checked={contrast}
                  onChange={(_, v) => setContrast(v)}
                />
              }
            >
              Change contrast
            </ListItem>
            <ListItem
              action={
                <Switch
                  size="sm"
                  checked={pointerLight}
                  onChange={(_, v) => setPointerLight(v)}
                />
              }
            >
              Pointer light
            </ListItem>
          </List>
        </GlassCard>
      </Popover>
    </>
  );
}
