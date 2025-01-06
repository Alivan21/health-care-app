"use client";

import MainContainer from "@/components/layouts/main-container";
import { useState } from "react";
import ReferralHeader from "../_components/header/title";
import KanbanReferral from "../_components/kanban";

export default function SpecialityAffiliationReferralClient() {
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
      <KanbanReferral />
    </MainContainer>
  );
}
