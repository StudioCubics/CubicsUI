import { CubicsUIPlaygroundLogo } from "@/public/logos/CubicsUIPlaygroundLogo";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarLayout,
  SidebarViewport,
} from "@cubicsui/components";
import type { ReactNode } from "react";
import { SidebarFooterContent } from "@/lib/ui/Layout/Sidebar/SidebarFooterContent";
import { SidebarList } from "@/lib/ui/Layout/Sidebar/SidebarList";

export default function Layout(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <div style={{ height: "100dvh" }}>
      <SidebarLayout>
        <Sidebar>
          <SidebarHeader logo={<CubicsUIPlaygroundLogo />} />
          <SidebarBody>
            <SidebarList />
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
