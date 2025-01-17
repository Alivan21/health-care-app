import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MedicalCardMockData } from "@/constant/mock/medical-card";
import { MedicalCardTypes } from "@/constant/types/referral";
import { convertToSlug } from "@/lib/utils";
import { useState } from "react";
import ReferralDrawer from "@/components/drawer/referral";
import RequestApprovalDialog from "@/components/dialog/approval";
import { AppointmentsTable } from "./list-table";

export default function ListReferral({
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
  const [listData, setlistData] = useState<MedicalCardTypes | null>(null);
  const [isDraft, setIsDraft] = useState(false);
  const [cardPropsArray, setCardPropsArray] = useState<MedicalCardTypes[]>(MedicalCardMockData);

  const updateAssignTo = (id: string, newAssignTo: string) => {
    setCardPropsArray(prev =>
      prev.map(card => (card.id === id ? { ...card, assign_to: newAssignTo } : card))
    );
  };

  const handleOpenDrawer = (data: MedicalCardTypes) => {
    setlistData(data);
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
    new: "bg-gray-500",
    pending: "bg-yellow-300",
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
      return cards.filter(card => convertToSlug(card.name) === pathSegment);
    }

    return cards;
  };

  if (view !== "list") return null;

  return (
    <>
      {!!listData && (
        <ReferralDrawer
          isApproved={listData.status !== "new"}
          isAssigned={Boolean(listData.assign_to)}
          isDenied={listData.status === "denied"}
          onClickApproval={handleOpenApproval}
          onClose={() => setOpen(false)}
          open={open}
          props={listData}
        />
      )}

      <RequestApprovalDialog
        isDraft={isDraft}
        onClose={() => setOpenApprovalDialog(false)}
        open={openApprovalDialog}
      />

      <ScrollArea className="w-full">
        <section className="flex flex-col gap-4 px-8 py-6">
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
                className="relative flex max-h-screen w-full flex-col overflow-auto rounded-lg border border-border !bg-white"
                key={status}
              >
                <div className="sticky top-0 z-20 m-3 flex gap-2 rounded-lg bg-[#F6F7FA] px-3 py-2">
                  <span className={`w-1.5 rounded-lg ${statusStyles[status]}`} />
                  <div className="space-x-2">
                    <span className="capitalize">{status}</span>
                    <Badge className="rounded-lg px-1.5">{statusFilteredCards.length}</Badge>
                  </div>
                </div>

                <AppointmentsTable
                  data={statusFilteredCards}
                  onCardClick={cardData => handleOpenDrawer(cardData)}
                  onUserClick={(cardId, newAssign) => updateAssignTo(cardId, newAssign)}
                />
              </ScrollArea>
            );
          })}
        </section>
      </ScrollArea>
    </>
  );
}
