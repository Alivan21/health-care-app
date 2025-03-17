"use client";

import { PageHeader } from "@/components/layouts/header";
import PriorityReferralClient from "../client";
import { usePathname } from "next/navigation";
import { formatSlug } from "@/lib/utils";

export default function PriorityReferralsPage() {
  const pathname = usePathname();

  const slug = pathname?.split("/").filter(Boolean).pop();

  const breadcrumbs = [
    { title: "Dashboard", link: "/" },
    { title: "Referrals", link: "/referrals" },
    { title: formatSlug(slug), link: `/referrals/${slug ?? ""}` },
  ];

  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} />
      <PriorityReferralClient />
    </>
  );
}
