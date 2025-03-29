import React, { useState } from "react";
import { ReusableTable } from "../list/list-table";
import { IncomingMockData } from "@/constant/mock/incoming-data";
import { createIncomingTableData } from "@/constant/mock/table-data";
import IncomingDocumentDialog from "@/components/dialog/incoming/document-dialog";
import SuccessDialog from "@/components/dialog/success-dialog";
import RequestApprovalDialog from "@/components/dialog/approval";
import { MedicalCardTypes } from "@/constant/types/referral";
import { MedicalCardMockData } from "@/constant/mock/medical-card";
import IncomingReferralDrawer from "@/components/drawer/incoming-referral";

export default function IncomingSection({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [submitReferralOpen, setSubmitReferralOpen] = useState(false);
  const [isParsed, setIsParsed] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [referralData, setReferralData] = useState<MedicalCardTypes | null>(null);
  const [openApprovalDialog, setOpenApprovalDialog] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const handlePendingOpenDrawer = () => {
    setReferralData(MedicalCardMockData[4]);
    setSubmitReferralOpen(true);
  };

  const handleCompletedOpenDrawer = () => {
    setReferralData(MedicalCardMockData[8]);
    setSubmitReferralOpen(true);
  };

  const tableCol = createIncomingTableData(
    handlePendingOpenDrawer,
    handleCompletedOpenDrawer,
    openDialog
  );

  const handleClose = () => {
    setOpen(false);
    setIsParsed(false);
  };

  return (
    <>
      {!!referralData && (
        <IncomingReferralDrawer
          isApproved={referralData.status !== "new"}
          isAssigned={Boolean(referralData.assign_to)}
          isDenied={referralData.status === "denied"}
          onClickApproval={() => setOpenApprovalDialog(true)}
          onClose={() => setSubmitReferralOpen(false)}
          open={submitReferralOpen}
          props={referralData}
        />
      )}

      <RequestApprovalDialog
        isDraft={false}
        onClose={() => setOpenApprovalDialog(false)}
        open={openApprovalDialog}
      />

      <IncomingDocumentDialog
        isParsed={isParsed}
        onClose={handleClose}
        open={open}
        setIsParsed={() => {
          setIsParsed(true);
        }}
        setReferral={setShowSuccessDialog}
      />

      <SuccessDialog onClose={() => setShowSuccessDialog(false)} open={showSuccessDialog} />

      <div className={`w-full px-6 py-5 ${className}`}>
        <ReusableTable columns={tableCol} data={IncomingMockData} />
      </div>
    </>
  );
}
