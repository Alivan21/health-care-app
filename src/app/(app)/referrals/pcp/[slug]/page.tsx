import { PageHeader } from "@/components/layouts/header";
import PcpReferralClient from "../client";

const breadcrumbs = [
  { title: "Dashboard", link: "/" },
  { title: "All Queue", link: "/referrals" },
];

export default function PcpReferralsPage() {
  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} />
      <PcpReferralClient />
    </>
  );
}
