import type { ReactNode } from "react";
import { CubicsUIPlaygroundLogo } from "@/public/logos/CubicsUIPlaygroundLogo";
import {
  SidebarLayout,
  Sidebar,
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
  SidebarViewport,
} from "@cubicsui/components";
import { SidebarBodyContent } from "./SidebarBodyContent";
import { SidebarFooterContent } from "./SidebarFooterContent";

export function PlaygroundSidebar({ children }: { children: ReactNode }) {
  return (
    <div style={{ height: "100dvh" }}>
      <SidebarLayout>
        <Sidebar>
          <SidebarHeader logo={<CubicsUIPlaygroundLogo />} />
          <SidebarBody>
            <SidebarBodyContent />
          </SidebarBody>
          <SidebarFooter showOnClose>
            <SidebarFooterContent />
          </SidebarFooter>
        </Sidebar>
        <SidebarViewport persistScrollPosition>{children}</SidebarViewport>
      </SidebarLayout>
    </div>
  );
}
