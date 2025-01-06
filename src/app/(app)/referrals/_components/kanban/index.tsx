"use client";

import RequestApprovalDialog from "@/components/dialog/approval";
import ReferralDrawer from "@/components/drawer/referral";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import MedicalCard from "../ui/medical-card";
import { MedicalCardMockData } from "@/constant/mock/medical-card";
import { MedicalCardTypes } from "@/constant/types/referral";

export default function KanbanReferral({ pathname }: { pathname?: string }) {
  const [open, setOpen] = useState(false);
  const [openApprovalDialog, setOpenApprovalDialog] = useState(false);
  const [kanbanData, setKanbanData] = useState<MedicalCardTypes | null>(null);

  const handleOpenDrawer = (data: MedicalCardTypes) => {
    setKanbanData(data);
    setOpen(true);
  };

  const handleOpenApproval = () => {
    setOpenApprovalDialog(true);
  };

  const categorizedData = {
    new: MedicalCardMockData.slice(0, 3),
    pending: MedicalCardMockData.slice(3, 5),
    approved: MedicalCardMockData.slice(5, 8),
    complete: MedicalCardMockData.slice(8, 12),
    denied: MedicalCardMockData.slice(0, 3),
  }

  const statusStyles: { [key in keyof typeof categorizedData]: string } = {
    new: "bg-gray-500",
    pending: "bg-yellow-300",
    approved: "bg-primary",
    complete: "bg-green-500",
    denied: "bg-destructive",
  }

  return (
    <>
      {kanbanData && (
        <ReferralDrawer
          props={kanbanData}
          isApproved={kanbanData.priority === "SUCCESS"}
          isAssigned={Boolean(kanbanData.assign_to)}
          isDenied={kanbanData.priority === "STAT"}
          onClickApproval={handleOpenApproval}
          onClose={() => setOpen(false)}
          open={open}
        />
      )}
      <RequestApprovalDialog
        onClose={() => setOpenApprovalDialog(false)}
        open={openApprovalDialog}
      />
      <ScrollArea className="w-full">
        <section className="flex gap-4 px-8 py-6">
        {Object.entries(categorizedData).map(([status, cards]) => {
          const filteredCards = pathname
            ? cards.filter(
                (card) => card.priority.toLowerCase() === pathname.split('/').filter(Boolean).pop()
              )
            : cards;

          return (
            filteredCards.length > 0 && (
              <ScrollArea
                key={status}
                className="relative flex max-h-screen w-fit flex-col gap-4 overflow-auto rounded-lg bg-secondary"
              >
                <div className="sticky top-0 z-20 flex gap-2 bg-secondary p-2">
                  <span className={`w-1.5 rounded-lg ${statusStyles[status as keyof typeof statusStyles]}`} />
                  <div className="space-x-2">
                    <span className="capitalize">{status}</span>
                    <Badge className="rounded-lg px-1.5">{filteredCards.length}</Badge>
                  </div>
                </div>
                {filteredCards.map((cardData) => (
                  <div className="flex flex-col gap-2 p-2" key={cardData.id}>
                    <MedicalCard
                      cardProps={cardData}
                      isAssigned={Boolean(cardData.assign_to)}
                      onCardClick={() => handleOpenDrawer(cardData)}
                    />
                  </div>
                ))}
              </ScrollArea>
            )
          );
        })}
        </section>
      </ScrollArea>
    </>
  );
}
