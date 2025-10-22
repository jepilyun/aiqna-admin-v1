"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { reqAdminAuthLogout } from "@/requests/req-admin/req-auth";
import { ADMIN_MENU_ITEMS as items } from "@/config/menu-config";

export function AppSidebar() {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setOpenMenus((prev) => {
      const updated = { ...prev };
      items.forEach((item) => {
        if (item.children) {
          const active = item.children.some(
            (child) => pathname === child.url || pathname.startsWith(`${child.url}/`)
          );
          if (active) updated[item.title] = true;
        }
      });
      return updated;
    });
  }, [pathname]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const result = await reqAdminAuthLogout();
      result.success ? router.push("/login") : toast.error(result.alarm || result.msg || "Logout failed");
    } catch {
      toast.error("An error occurred during logout");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isActive = (url: string) =>
    pathname === url || (url !== "/" && pathname.startsWith(`${url}/`));

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Trand Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <>
                      <SidebarMenuButton onClick={() => toggleMenu(item.title)}>
                        <div className="flex justify-between items-center w-full cursor-pointer">
                          <span
                            className={cn(
                              isActive(item.url)
                                ? "font-bold text-primary"
                                : "text-foreground"
                            )}
                          >
                            {item.title}
                          </span>
                          {openMenus[item.title] ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </div>
                      </SidebarMenuButton>
                      {openMenus[item.title] && (
                        <SidebarMenuSub>
                          {item.children.map((sub) => (
                            <SidebarMenuSubItem key={sub.title}>
                              <Link href={sub.url}>
                                <span
                                  className={cn(
                                    "block text-sm hover:underline",
                                    isActive(sub.url)
                                      ? "font-bold text-primary"
                                      : "text-muted-foreground"
                                  )}
                                >
                                  {sub.title}
                                </span>
                              </Link>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <span
                          className={cn(
                            isActive(item.url)
                              ? "font-bold bg-primary text-primary-foreground"
                              : ""
                          )}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="outline" onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
