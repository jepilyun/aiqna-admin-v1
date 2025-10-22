// app/(with-sidebar)/layout.tsx
"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SIDEBAR_WIDTH, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Toaster } from "sonner";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const sidebarState = useSidebar();

  return (
    <>
      <AppSidebar />
      <main
        className="transition-all duration-300 p-4 w-full mx-auto"
        style={{
          maxWidth: sidebarState.isMobile ? `100vw` : sidebarState.open ? `calc(100vw - ${SIDEBAR_WIDTH})` : `100vw`,
        }}
      >
        <SidebarTrigger />
        {children}
      </main>
    </>
  );
}

export default function WithSidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
      <Toaster />
    </SidebarProvider>
  );
}
