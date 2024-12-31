"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function CollapseButton() {
  const { toggleSidebar, state } = useSidebar();

  return (
    <Button
      className="absolute -right-3 top-32 z-10 size-6 rounded-lg border bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
      onClick={toggleSidebar}
      size="icon"
      variant="outline"
    >
      {state === "expanded" ? <ArrowLeft className="size-3" /> : <ArrowRight className="size-3" />}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  badge?: number;
  tooltip?: string;
}

export interface MenuSection {
  label: string;
  items: MenuItem[];
}

export function MainSidebar({ menu }: { menu: MenuSection[] }) {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar className="border-r" collapsible="icon">
      <CollapseButton />
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="size-8">
            <AvatarImage src="/img/user-profile-1.svg" />
            <AvatarFallback>NB</AvatarFallback>
          </Avatar>
          {state === "expanded" ? (
            <div className="flex flex-col">
              <span className="text-sm font-medium">nathaniel@healthcare.com</span>
            </div>
          ) : null}
        </div>
        <div className="mt-4 flex gap-2">
          <Input className="h-8" placeholder="Search" type="search" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {menu.map((section, sectionIndex) => (
          <SidebarGroup
            className={sectionIndex === menu.length - 1 ? "mt-auto" : ""}
            key={sectionIndex}
          >
            <SidebarGroupLabel className="text-xs font-normal text-muted-foreground">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent className="pl-2">
              <SidebarMenu>
                {section.items.map((item, itemIndex) => (
                  <SidebarMenuItem key={itemIndex}>
                    <SidebarMenuButton
                      asChild
                      className={
                        pathname === item.href
                          ? "pointer-events-none bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))]"
                          : "hover:bg-accent hover:text-sidebar-accent-foreground"
                      }
                      disabled={pathname === item.href}
                      tooltip={item.tooltip || item.title}
                    >
                      <Link
                        className={pathname === item.href ? "cursor-default" : "cursor-pointer"}
                        href={item.href || "#"}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                        {item.badge ? (
                          <Badge
                            className="ml-auto size-5 justify-center rounded-md px-0"
                            variant="destructive"
                          >
                            {item.badge}
                          </Badge>
                        ) : null}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
