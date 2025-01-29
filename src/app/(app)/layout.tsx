import { MainSidebar } from "@/components/layouts/sidebar";
import { SidebarMenuList } from "@/components/layouts/sidebar/list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <MainSidebar menu={SidebarMenuList} />
        <ScrollArea
          className="flex max-h-dvh w-full flex-col !overflow-x-auto"
          viewportClassName="[&>div]:!block"
        >
          <div
            className="relative grow overflow-auto"
            style={{
              backgroundColor: "white",
              backgroundImage: "radial-gradient(circle, #E5E7EB 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          >
            {children}
          </div>
        </ScrollArea>
      </div>
    </SidebarProvider>
  );
}
