"use client";

import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CircleHelp,
  FileSpreadsheet,
  LayoutDashboard,
  MessageSquareMore,
  Network,
  Share2,
  Users,
} from "lucide-react";

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

export function MainSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar className="border-r" collapsible="icon">
      <CollapseButton />
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="size-8">
            <AvatarImage src="/placeholder.svg" />
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
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-normal text-muted-foreground">
            GENERAL
          </SidebarGroupLabel>
          <SidebarGroupContent className="pl-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard">
                  <LayoutDashboard className="size-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Referrals">
                  <Share2 className="size-4" />
                  <span>Referrals</span>
                  <Badge
                    className="ml-auto size-5 justify-center rounded-md px-0"
                    variant="destructive"
                  >
                    12
                  </Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Patients">
                  <Users className="size-4" />
                  <span>Patients</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Provider Network">
                  <Network className="size-4" />
                  <span>Provider Network</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Workflows">
                  <FileSpreadsheet className="size-4" />
                  <span>Workflows</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Analytics">
                  <BarChart3 className="size-4" />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="text-xs font-normal text-muted-foreground">
            OTHER
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Chat & Support">
                  <MessageSquareMore className="size-4" />
                  <span>Chat & Support</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Help Center">
                  <CircleHelp className="size-4" />
                  <span>Help Center</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
