import { PageHeader } from "@/components/layouts/header";
import ReferralClient from "./_components/client";

const breadcrumbs = [
  { title: "Dashboard", link: "/" },
  { title: "Referrals", link: "/referrals" },
];

export default function ReferralsPage() {
  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} />
      <ReferralClient />
    </>
  );
}
