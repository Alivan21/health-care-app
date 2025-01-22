import React, { useState } from "react";
import { ReusableTable } from "../list/list-table";
import { IncomingMockData } from "@/constant/mock/incoming-data";
import { createIncomingTableData } from "@/constant/mock/table-data";
import IncomingDocumentDialog from "@/components/dialog/incoming/document-dialog";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import SuccessDialog from "@/components/dialog/success-dialog";
import RequestApprovalDialog from "@/components/dialog/approval";
import { MedicalCardTypes } from "@/constant/types/referral";
import { MedicalCardMockData } from "@/constant/mock/medical-card";
import IncomingReferralDrawer from "@/components/drawer/incoming-referral";

export default function IncomingSection() {
  const { toast } = useToast();
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
          setTimeout(() => {
            toast({
              color: "#E9F7EF",
              className: "bg-[#E7F6EC] border-0",
              duration: 1000,
              description: (
                <div className="flex items-center gap-2 text-[#0E844E]">
                  <Check className="size-5" />
                  <span className="font-medium">Parsing Completed!</span>
                </div>
              ),
            });
          }, 500);
        }}
        setReferral={setShowSuccessDialog}
      />

      <SuccessDialog onClose={() => setShowSuccessDialog(false)} open={showSuccessDialog} />

      <div className="px-6 py-5">
        <ReusableTable columns={tableCol} data={IncomingMockData} />
      </div>
    </>
  );
}
