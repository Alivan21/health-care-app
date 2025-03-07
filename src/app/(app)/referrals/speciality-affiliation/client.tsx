"use client";

import MainContainer from "@/components/layouts/main-container";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ReferralHeader from "../_components/header/title";
import KanbanReferral from "../_components/kanban";
import ListReferral from "../_components/list";
import ScrollHorizontalButton from "../_components/ui/scroll-horizontal-button";

export default function SpecialityAffiliationReferralClient() {
  const pathname = usePathname();
  const [queue, setQueue] = useState("all");
  const [view, setView] = useState("kanban");
  const [status, setStatus] = useState("outgoing");
  const [cardStatus, setCardStatus] = useState("all");

  const { scrollContainerRef, scrollLeft, scrollRight } = useHorizontalScroll();

  return (
    <>
      <ScrollHorizontalButton onClick={scrollLeft} position="left" />
      <ScrollHorizontalButton onClick={scrollRight} position="right" />
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
        <div className="no-scrollbar relative w-full overflow-x-auto" ref={scrollContainerRef}>
          <div className="flex w-max">
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
          </div>
        </div>
      </MainContainer>
    </>
  );
}
