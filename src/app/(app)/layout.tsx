import { MainSidebar } from "@/components/layouts/sidebar";
import { SidebarMenuList } from "@/components/layouts/sidebar/list";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <ScrollArea className="w-full">
        <div className="flex w-max">
          <MainSidebar menu={SidebarMenuList} />
          <ScrollArea
            className="z-10 flex max-h-dvh w-full flex-col !overflow-x-auto"
            viewportClassName="[&>div]:!block"
          >
            <div
              className="relative min-h-dvh grow overflow-auto"
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </SidebarProvider>
  );
}
