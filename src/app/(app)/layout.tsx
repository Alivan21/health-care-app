import { SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "./_components/header";
import { MainSidebar } from "./_components/sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex w-full gap-1">
        <MainSidebar />
        <div className="container relative flex min-h-dvh w-full flex-col">
          <SiteHeader />
          <main className="overflow-y-auto bg-muted/10 px-10 py-5">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
