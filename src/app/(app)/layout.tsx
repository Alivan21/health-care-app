import { MainSidebar } from "@/components/layouts/sidebar";
import { SidebarMenuList } from "@/components/layouts/sidebar/list";
import { SidebarProvider } from "@/components/ui/sidebar";
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex w-full gap-1">
        <MainSidebar menu={SidebarMenuList} />
        <div className="container flex min-h-dvh w-full flex-col">
          <div className="relative overflow-y-auto bg-muted/10">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
