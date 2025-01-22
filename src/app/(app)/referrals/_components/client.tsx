"use client";

import MainContainer from "@/components/layouts/main-container";
import { useState } from "react";
import ReferralHeader from "./header/title";
import KanbanReferral from "./kanban";
import ListReferral from "./list";
import IncomingSection from "./incoming/incoming-section";
import { Toaster } from '@/components/ui/toaster'

export default function ReferralClient() {
  const [queue, setQueue] = useState("all");
  const [view, setView] = useState("kanban");
  const [status, setStatus] = useState("outgoing");
  const [cardStatus, setCardStatus] = useState("all");

  return (
    <MainContainer className="flex flex-col !p-0">
      <Toaster />
      <ReferralHeader
        cardStatus={cardStatus}
        queue={queue}
        setCardStatus={setCardStatus}
        setQueue={setQueue}
        setStatus={setStatus}
        setView={setView}
        status={status}
        view={view}
      />
      {status === 'outgoing' ? (
        <KanbanReferral queueFilter={queue} statusFilter={cardStatus} view={view} />
      ): (
        <IncomingSection />
      )}
      <ListReferral queueFilter={queue} statusFilter={cardStatus} view={view} />
    </MainContainer>
  );
}
