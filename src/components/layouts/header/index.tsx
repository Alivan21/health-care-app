"use client";

import { PageBreadcrumbProps, PageBreadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Bell, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  breadcrumbs?: PageBreadcrumbProps[];
}

export function PageHeader({ breadcrumbs = [] }: PageHeaderProps) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <div className="flex items-center gap-3">
          <Button asChild size="icon" variant="ghost">
            <Link href="#" onClick={() => router.back()}>
              <ArrowLeft className="size-4" />
              <span className="sr-only">Go back</span>
            </Link>
          </Button>
          <PageBreadcrumbs items={breadcrumbs} />
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="w-64">
            <Input className="h-8 w-full" placeholder="Search..." type="search" />
          </div>
          <Button size="icon" variant="ghost">
            <Settings className="size-4" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button size="icon" variant="ghost">
            <Bell className="size-4" />
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
