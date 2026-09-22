import { SidebarFooterContent } from "@/lib/ui/Layout/SidebarLayout/SidebarFooterContent";
import { SidebarList } from "@/lib/ui/Layout/SidebarLayout/SidebarList";
import { CubicsUILogo } from "@/public/logos/CubicsUILogo";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarLayout,
  SidebarViewport,
} from "@cubicsui/components";
import type { ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <div style={{ height: "100dvh" }}>
      <SidebarLayout>
        <Sidebar>
          <SidebarHeader logo={<CubicsUILogo />} />
          <SidebarBody>
            <SidebarList />
          </SidebarBody>
          <SidebarFooter>
            <SidebarFooterContent />
          </SidebarFooter>
        </Sidebar>
        <SidebarViewport persistScrollPosition>{children}</SidebarViewport>
      </SidebarLayout>
    </div>
  );
}
