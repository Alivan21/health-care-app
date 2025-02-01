"use client";

import MainContainer from "@/components/layouts/main-container";
import { Badge } from "@/components/ui/badge";
import { DashboardCardData } from "@/constant/mock/dashboard-card-data";
import { MedicalCardMockData } from "@/constant/mock/medical-card";
import { createMedicalColumns } from "@/constant/mock/table-data";
import type { MedicalCardTypes } from "@/constant/types/referral";
import { CircleCheck } from "lucide-react";
import { useState } from "react";
import IncomingSection from "../../referrals/_components/incoming/incoming-section";
import { ReusableTable } from "../../referrals/_components/list/list-table";
import ChartSection from "./chart-section";
import DashboardCardSection, { DashboardCardProps } from "./dashboard-card-section";
import DashboardShortcuts from "./dashboard-shortcuts";
import ReferralDrawer from "@/components/drawer/referral";
import RequestApprovalDialog from "@/components/dialog/approval";

export default function DashboardClient() {
  const [open, setOpen] = useState(false);
  const [openApprovalDialog, setOpenApprovalDialog] = useState(false);
  const [cardPropsArray, setCardPropsArray] = useState<MedicalCardTypes[]>(
    MedicalCardMockData.filter(data => data.status === "new")
  );
  const [cardSection, setCardSection] = useState<DashboardCardProps[]>(DashboardCardData);
  const [listData, setListData] = useState<MedicalCardTypes | null>(null);
  const [tableTitle, setTableTitle] = useState<string>("");

  const updateAssignTo = (id: string, newAssignTo: string) => {
    setCardPropsArray(prev =>
      prev.map(card => (card.id === id ? { ...card, assign_to: newAssignTo } : card))
    );
  };

  const unassignCard = (id: string) => {
    setCardPropsArray(prev =>
      prev.map(card => (id === card.id ? { ...card, assign_to: "" } : card))
    );
  };

  const handleOpenDrawer = (data: MedicalCardTypes) => {
    setListData(data);
    setOpen(true);
  };

  const handleOpenApproval = () => {
    setOpenApprovalDialog(true);
  };

  const addShortcut = (label: string) => {
    setCardSection(prevData => [
      ...prevData,
      { title: label, icon: <CircleCheck className="size-3 text-[#1757F7]" />, amount: 3 },
    ]);
  };

  const deleteShortcut = (label: string) => {
    setCardSection(prevData => prevData.filter(card => card.title !== label));
  };

  const tableColumn = createMedicalColumns(handleOpenDrawer, updateAssignTo, unassignCard);

  const handleTableChange = (title: string) => {
    setTableTitle(title);
  };

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
        isDraft={false}
        onClose={() => setOpenApprovalDialog(false)}
        open={openApprovalDialog}
      />

      <MainContainer>
        <div className="mb-4 flex size-full space-x-2">
          <div className="flex size-full max-w-[300px] flex-col space-y-5">
            <DashboardCardSection data={cardSection} onClick={handleTableChange} />
            <DashboardShortcuts onAddShortcut={addShortcut} onDeleteShortcut={deleteShortcut} />
          </div>
          <ChartSection />
        </div>

        <div className="rounded-lg border border-border">
          <div className="sticky top-0 z-20 m-3 flex gap-2 rounded-lg bg-[#F6F7FA] px-3 py-2">
            <span className="w-1.5 rounded-lg bg-[#FF5B5B]" />
            <div className="flex items-center space-x-2">
              <span className="capitalize">
                {tableTitle === "" ? "No Section Selected" : tableTitle}
              </span>
              <Badge className={`${tableTitle === "" ? "hidden" : "flex"} rounded-lg px-1.5`}>
                {cardPropsArray.length}
              </Badge>
            </div>
          </div>

          {tableTitle === "Incoming Order" ? (
            <IncomingSection />
          ) : tableTitle === "" ? (
            <div />
          ) : (
            <ReusableTable columns={tableColumn} data={cardPropsArray} />
          )}
        </div>
      </MainContainer>
    </>
  );
}
