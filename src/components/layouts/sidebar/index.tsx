"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
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
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  icon?: React.ReactNode;
  href?: string;
  badge?: number;
  tooltip?: string;
  child?: MenuItem[]
}

export interface MenuSection {
  label: string;
  items: MenuItem[];
}

function RecursiveMenuItem({
  item,
  level,
  isActive,
  onClick
}: {
  item: MenuItem
  level: number
  isActive: boolean
  onClick: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const isReferrals = item.href === '/referrals'

  const handleItemClick = () => {
    if (item.child && !isReferrals) {
      setIsOpen(!isOpen)
    }
    onClick()
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild={!item.child || isReferrals}
        className={cn(
          "w-full justify-between pl-9 py-2 mb-2",
          isActive && "bg-white border border-sidebar-border text-accent-foreground",
          level > 0 && 'pl-14'
        )}
        onClick={handleItemClick}
      >
        {item.child && !isReferrals ? (
          <div className="flex w-full items-center justify-between py-2">
            <span className="flex items-center gap-2">
              {item.icon}
              {item.title}
            </span>
            <ChevronRight className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")} />
          </div>
        ) : (
          <Link className="mb-2 flex w-full items-center justify-between py-2" href={item.href || '#'}>
            <span className="flex items-center gap-2">
              {item.icon}
              {item.title}
            </span>
            {item.badge != null && <Badge>{item.badge}</Badge>}
          </Link>
        )}
      </SidebarMenuButton>
      {item.child != null && !isReferrals && (
        <Collapsible open={isOpen}>
          <CollapsibleContent>
            {item.child.map((childItem, index) => (
              <RecursiveMenuItem
                isActive={false}
                item={childItem}
                key={index}
                level={level + 1}
                onClick={onClick}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </SidebarMenuItem>
  )
}

export function MainSidebar({ menu }: { menu: MenuSection[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDashboardView, setIsDashboardView] = useState(false);
  const { state } = useSidebar();

  useEffect(() => {
    if (pathname === "/") {
      setIsDashboardView(true)
    } else {
      setIsDashboardView(false)
    }
    console.log(pathname)
  }, [pathname])

  const handleItemClick = (item: MenuItem) => {
    if (item.href === '/referrals') {
      setIsDashboardView(false);
    } else if (item.child) {
    } else {
      setIsDashboardView(true);
    }
  };

  const renderMenuItems = (items?: MenuItem[], level = 0) => {
    return items && items.map((item, index) => (
      <RecursiveMenuItem
        isActive={pathname === item.href}
        item={item}
        key={index}
        level={level}
        onClick={() => handleItemClick(item)}
      />
    ));
  };

  const referralsItem = menu[0].items.find(item => item.href === '/referrals');

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
        {!isDashboardView && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="mt-5 w-full justify-start"
                    onClick={() => {
                      router.replace("/")
                      setIsDashboardView(true)
                    }}
                  >
                    <ArrowLeft className="mr-1 size-4" />
                    Back to Home
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        {isDashboardView ? (
          menu.map((section, sectionIndex) => (
            <SidebarGroup
              className={sectionIndex === menu.length - 1 ? "mt-auto" : ""}
              key={sectionIndex}
            >
              <SidebarGroupLabel className="text-xs font-normal text-muted-foreground">
                {isDashboardView ? section.label : ''}
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
                        onClick={() => handleItemClick(item)}
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
          ))
        ) : (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {renderMenuItems(referralsItem?.child)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
