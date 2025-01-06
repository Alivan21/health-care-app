import { PageHeader } from "@/components/layouts/header";
import SpecialityAffiliationReferralClient from "./client";


const breadcrumbs = [
  { title: "Dashboard", link: "/" },
  { title: "All Queue", link: "/referrals" },
];

export default function SpecialityAffiliationReferralsPage() {
  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} />
      <SpecialityAffiliationReferralClient />
    </>
  )
}