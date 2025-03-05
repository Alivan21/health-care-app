"use client";

import MainContainer from "@/components/layouts/main-container";
import { useState } from "react";
import ReferralHeader from "../_components/header/title";
import KanbanReferral from "../_components/kanban";
import { usePathname } from "next/navigation";
import ListReferral from "../_components/list";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function SpecialityAffiliationReferralClient() {
  const pathname = usePathname();
  const [queue, setQueue] = useState("all");
  const [view, setView] = useState("kanban");
  const [status, setStatus] = useState("outgoing");
  const [cardStatus, setCardStatus] = useState("all");

  return (
    <MainContainer className="flex flex-col !p-0">
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
      <ScrollArea>
        <KanbanReferral
          pathname={pathname}
          queueFilter={queue}
          statusFilter={cardStatus}
          view={view}
        />
        <ListReferral
          pathname={pathname}
          queueFilter={queue}
          statusFilter={cardStatus}
          view={view}
        />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </MainContainer>
  );
}
