import { CubicsUIPlaygroundLogo } from "@/public/logos/CubicsUIPlaygroundLogo";
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarLayout,
  SidebarViewport,
} from "@cubicsui/components";
import type { ReactNode } from "react";
import { SidebarList } from "./list";
import { SidebarFooter } from "@/lib/ui/Layout/SidebarFooter/SidebarFooter";

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
          <SidebarFooter />
        </Sidebar>
        <SidebarViewport>{children}</SidebarViewport>
      </SidebarLayout>
    </div>
  );
}
