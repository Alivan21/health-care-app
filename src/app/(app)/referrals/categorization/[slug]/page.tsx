import { PageHeader } from "@/components/layouts/header";
import CategorizationReferralClient from "../client";

const breadcrumbs = [
  { title: "Dashboard", link: "/" },
  { title: "All Queue", link: "/referrals" },
];

export default function PriorityReferralsPage() {
  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} />
      <CategorizationReferralClient />
    </>
  );
}
