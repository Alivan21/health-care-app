"use client";

import RequestApprovalDialog from "@/components/dialog/approval";
import ReferralDrawer from "@/components/drawer/referral";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MedicalCardMockData } from "@/constant/mock/medical-card";
import { MedicalCardTypes } from "@/constant/types/referral";
import { useState } from "react";
import MedicalCard from "../ui/medical-card";
import { convertToSlug } from "@/lib/utils";

export default function KanbanReferral({
  pathname,
  queueFilter,
  view,
  statusFilter,
}: {
  pathname?: string;
  queueFilter: string;
  view: string;
  statusFilter?: string;
}) {
  const [open, setOpen] = useState(false);
  const [openApprovalDialog, setOpenApprovalDialog] = useState(false);
  const [kanbanData, setKanbanData] = useState<MedicalCardTypes | null>(null);
  const [isDraft, setIsDraft] = useState(false);
  const [cardPropsArray, setCardPropsArray] = useState<MedicalCardTypes[]>(MedicalCardMockData);

  const updateAssignTo = (id: string, newAssignTo: string) => {
    setCardPropsArray(prev =>
      prev.map(card => (id === card.id ? { ...card, assign_to: newAssignTo } : card))
    );
  };

  const unassignCard = (id: string) => {
    setCardPropsArray(prev =>
      prev.map(card => (id === card.id ? { ...card, assign_to: "" } : card))
    );
  };

  const handleOpenDrawer = (data: MedicalCardTypes) => {
    if (pathname?.includes("/referrals/draft")) {
      setIsDraft(true);
    }

    setKanbanData(data);
    setOpen(true);
  };

  const handleOpenApproval = () => {
    if (pathname?.includes("/referrals/draft")) {
      setIsDraft(true);
      setOpenApprovalDialog(true);
    } else {
      setIsDraft(false);
      setOpenApprovalDialog(true);
    }
  };

  const categorizedData = {
    new: cardPropsArray.slice(0, 3),
    pending: cardPropsArray.slice(3, 5),
    approved: cardPropsArray.slice(5, 8),
    completed: cardPropsArray.slice(8, 12),
    denied: cardPropsArray.slice(12),
  };

  const statusStyles: Record<string, string> = {
    new: "bg-gray-300",
    pending: "bg-yellow-400",
    approved: "bg-primary",
    completed: "bg-green-500",
    denied: "bg-destructive",
  };

  const filterCards = (cards: MedicalCardTypes[], path: string | undefined): MedicalCardTypes[] => {
    if (!path) return cards;

    const pathSegment = path.split("/").filter(Boolean).pop()?.toLowerCase();
    if (!pathSegment) return cards;

    if (path === "/referrals/draft") {
      return cards.filter(card => card.status === "new").slice(0, 1);
    }

    if (path.includes("/speciality-affiliation/partner-network")) {
      const topCards = cards.filter(card => card.isTop);
      return topCards;
    } else if (path.includes("/priority")) {
      return cards.filter(card => card.priority.toLowerCase() === pathSegment);
    } else if (path.includes("/speciality")) {
      if (path.includes("/speciality/others")) {
        const excludedSpecialities = ["cardiology", "orthopedics", "pulmonology", "endocrinology"];
        return cards.filter(card => !excludedSpecialities.includes(card.speciality.toLowerCase()));
      }
      return cards.filter(card => card.speciality.toLowerCase() === pathSegment);
    } else if (path.includes("/pcp")) {
      return cards.filter(
        card => convertToSlug(card.name) === pathSegment && card.assign_to !== ""
      );
    }

    return cards;
  };

  if (view !== "kanban") return null;

  return (
    <>
      {!!kanbanData && (
        <ReferralDrawer
          isApproved={kanbanData.status !== "new"}
          isAssigned={Boolean(kanbanData.assign_to)}
          isDenied={kanbanData.status === "denied"}
          isDraft={isDraft}
          onClickApproval={handleOpenApproval}
          onClose={() => setOpen(false)}
          open={open}
          props={kanbanData}
        />
      )}

      <RequestApprovalDialog
        isDraft={isDraft}
        onClose={() => setOpenApprovalDialog(false)}
        open={openApprovalDialog}
      />

      <ScrollArea className="w-full">
        <section className="flex gap-4 px-8 py-6">
          {Object.entries(categorizedData).map(([status, cards]) => {
            const filteredCards = filterCards(cards, pathname).filter(card =>
              queueFilter === "my" ? card.assign_to !== "" : true
            );

            const statusFilteredCards = filteredCards.filter(card => {
              if (statusFilter === "all") {
                return true;
              } else if (statusFilter === "new") {
                return card.status === "new";
              } else if (statusFilter === "pending") {
                return card.status === "pending";
              } else if (statusFilter === "approved") {
                return card.status === "approved";
              } else if (statusFilter === "completed") {
                return card.status === "completed";
              } else if (statusFilter === "denied") {
                return card.status === "denied";
              }
              return false;
            });

            if (statusFilteredCards.length === 0) return null;
            return (
              <ScrollArea
                className="relative flex max-h-screen w-fit flex-col gap-4 overflow-auto rounded-lg bg-secondary"
                key={status}
              >
                <div className="sticky top-0 z-20 flex items-center gap-2 bg-secondary pb-1 pl-2 pt-3">
                  <span className={`h-5 w-[6px] rounded-lg ${statusStyles[status]}`} />
                  <div className="space-x-2">
                    <span className="text-sm capitalize">{status}</span>
                    <Badge className="rounded-lg px-1.5">{statusFilteredCards.length}</Badge>
                  </div>
                </div>

                {statusFilteredCards.map(cardData => (
                  <div className="flex flex-col gap-2 p-2" key={cardData.id}>
                    <MedicalCard
                      cardProps={cardData}
                      onCardClick={() => handleOpenDrawer(cardData)}
                      onUnassign={() => unassignCard(cardData.id)}
                      onUserClick={newAssignTo => updateAssignTo(cardData.id, newAssignTo)}
                    />
                  </div>
                ))}
              </ScrollArea>
            );
          })}
        </section>
      </ScrollArea>
    </>
  );
}
