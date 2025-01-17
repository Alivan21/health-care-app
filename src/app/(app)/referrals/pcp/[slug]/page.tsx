'use client';

import { PageHeader } from "@/components/layouts/header";
import PcpReferralClient from "../client";
import { usePathname } from "next/navigation";

export default function PcpReferralsPage() {
  const pathname = usePathname()

  const slug = pathname?.split("/").filter(Boolean).pop()

  const breadcrumbs = [
    { title: "Dashboard", link: "/" },
    { title: "Referrals", link: "/referrals" },
    { title: slug || "Loading...", link: `/referrals/${slug || ""}` },
  ]

  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} />
      <PcpReferralClient />
    </>
  );
}
