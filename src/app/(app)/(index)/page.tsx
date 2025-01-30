import { PageHeader } from "@/components/layouts/header";
import DashboardClient from "./_components/client";

const breadcrumbs = [{ title: "Dashboard", link: "/dashboard" }];

export default function Home() {
  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} />
      <DashboardClient />
    </>
  );
}
