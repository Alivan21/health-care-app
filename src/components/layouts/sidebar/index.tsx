"use client";

import CustomInput from "@/components/input/custom-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
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
import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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
  child?: MenuItem[];
}

export interface MenuSection {
  label: string;
  items: MenuItem[];
}

function RecursiveMenuItem({
  item,
  level,
  isActive,
  onClick,
}: {
  item: MenuItem;
  level: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isReferrals = item.href === "/referrals";

  const handleItemClick = () => {
    if (item.child && !isReferrals) {
      setIsOpen(!isOpen);
    }
    onClick();
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild={!item.child || isReferrals}
        className={cn(
          "mb-2 w-full justify-between py-2 pl-9",
          isActive && "border border-sidebar-border bg-white text-accent-foreground",
          level > 0 && "pl-14"
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
          <Link
            className="mb-2 flex w-full items-center justify-between py-2"
            href={item.href || "#"}
          >
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
  );
}

export function MainSidebar({ menu }: { menu: MenuSection[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();

  const renderMenuItems = (items?: MenuItem[], level = 0) => {
    return (
      items &&
      items.map((item, index) => (
        <RecursiveMenuItem
          isActive={pathname === item.href}
          item={item}
          key={index}
          level={level}
          onClick={() => {}}
        />
      ))
    );
  };

  const referralsItem = menu[0].items.find(item => item.href === "/referrals");

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
              <p className="text-sm font-semibold">Nathaniel Brooks</p>
              <span className="text-sm font-medium">nathaniel@healthcare.com</span>
            </div>
          ) : null}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="!hover:bg-transparent !border-0 !bg-transparent"
                size="icon"
                variant="outline"
              >
                <ChevronDown className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2">
              <div className="flex flex-col space-y-2">
                <Button
                  className="w-full justify-start"
                  onClick={() => console.log("My Account clicked")}
                  variant="ghost"
                >
                  My Account
                </Button>
                <Button
                  className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => console.log("Logout clicked")}
                  variant="ghost"
                >
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="mt-4 flex gap-2">
          <CustomInput 
            icon={<Search className="size-4 text-gray-600" />}
            placeholder="Search"
            type="search"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {pathname.includes("/referrals") && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="mt-5 w-full justify-start"
                    onClick={() => {
                      router.replace("/");
                    }}
                  >
                    <ArrowLeft className="mr-1 size-4" />
                    Back to Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        {!pathname.includes("/referrals") ? (
          menu.map((section, sectionIndex) => (
            <SidebarGroup
              className={sectionIndex === menu.length - 1 ? "mt-auto" : ""}
              key={sectionIndex}
            >
              <SidebarGroupLabel className="text-xs font-normal text-muted-foreground">
                {pathname !== "/referrals" ? section.label : ""}
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
          ))
        ) : (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>{renderMenuItems(referralsItem?.child)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
