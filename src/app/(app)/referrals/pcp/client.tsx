"use client";

import MainContainer from "@/components/layouts/main-container";
import { useState } from "react";
import ReferralHeader from "../_components/header/title";
import KanbanReferral from "../_components/kanban";
import { usePathname } from "next/navigation";

export default function PcpReferralClient() {
  const pathname = usePathname();
  const [queue, setQueue] = useState("all");
  const [view, setView] = useState("kanban");
  const [status, setStatus] = useState("outgoing");

  return (
    <MainContainer className="flex flex-col !p-0">
      <ReferralHeader
        queue={queue}
        setQueue={setQueue}
        setStatus={setStatus}
        setView={setView}
        status={status}
        view={view}
      />
      <KanbanReferral pathname={pathname} queueFilter={queue} view={view} />
    </MainContainer>
  );
}
