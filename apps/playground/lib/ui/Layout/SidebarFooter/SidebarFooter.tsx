"use client";

import {
  Button,
  Card,
  SidebarFooter as CuiSidebarFooter,
  GlassCard,
  List,
  ListItem,
  Popover,
  Switch,
  ThemeToggle,
  useContrast,
  usePointerLight,
  useSidebarLayout,
} from "@cubicsui/components";
import { useMounted } from "@cubicsui/hooks";
import { PointerLightIcon, SettingsIcon } from "@cubicsui/icons";

export function SidebarFooter() {
  const { mounted } = useMounted();
  const { contrast, setContrast } = useContrast();
  const { pointerLight, setPointerLight } = usePointerLight();
  const { sidebarOpen } = useSidebarLayout();
  if (!mounted) return;

  return (
    <CuiSidebarFooter showOnClose>
      <ThemeToggle
        variant={sidebarOpen ? "full" : "icon"}
        slotProps={{
          button: {
            align: sidebarOpen ? "left" : "center",
            fullWidth: sidebarOpen,
          },
        }}
      />
      <Button
        popoverTarget="settings_popover"
        startIcon={sidebarOpen ? <SettingsIcon /> : undefined}
        fullWidth={sidebarOpen}
        icon={!sidebarOpen}
        align={sidebarOpen ? "left" : "center"}
      >
        {sidebarOpen ? "Settings" : <SettingsIcon width={24} />}
      </Button>
      <Popover
        id={"settings_popover"}
        positionArea="center right"
        transformOrigin="center left"
      >
        <Card
          as={GlassCard}
          className="column"
          fixedWidth="min(250px, 80dvw)"
          style={{ margin: "var(--gap-5)" }}
        >
          <List>
            <ListItem
              action={
                <Switch
                  checked={contrast}
                  onChange={(_, v) => setContrast(v)}
                />
              }
            >
              High contrast
            </ListItem>
            <ListItem
              icon={<PointerLightIcon />}
              action={
                <Switch
                  checked={pointerLight}
                  onChange={(_, v) => setPointerLight(v)}
                />
              }
            >
              Pointer light
            </ListItem>
          </List>
        </Card>
      </Popover>

      {sidebarOpen && (
        <span style={{ textAlign: "center", fontSize: "var(--fs-xs)" }}>
          © {new Date().getFullYear()} CubicsUI
        </span>
      )}
    </CuiSidebarFooter>
  );
}
