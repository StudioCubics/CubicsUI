import { SidebarBodyContent } from "@/lib/ui/Layout/SidebarLayout/SidebarBodyContent";
import { SidebarFooterContent } from "@/lib/ui/Layout/SidebarLayout/SidebarFooterContent";
import { CubicsUILogo } from "@/public/logos/CubicsUILogo";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarLayout,
  SidebarViewport,
} from "@cubicsui/components";
import { type ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <div style={{ height: "100dvh" }}>
      <SidebarLayout>
        <Sidebar>
          <SidebarHeader logo={<CubicsUILogo />} />
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
