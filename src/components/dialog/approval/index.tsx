"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreVertical, X } from "lucide-react";
import { useState } from "react";
import DiscardDialog from "../discard-dialog";
import { AttachmentDocument } from "./tabs/attachment-document";
import ProcedureCodeSelector from "./tabs/prosedure-code";
import RenderingProviderSelect from "./tabs/rendering-provider";

interface Props {
  open?: boolean;
  onClose?: (open?: boolean) => void;
}

export default function RequestApprovalDialog({ open, onClose }: Props) {
  const [activeTab, setActiveTab] = useState("procedure");
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  const tabs = ["procedure", "rendering", "attachment"];

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const handleClose = () => {
    setShowDiscardDialog(true);
  };

  const handleDiscardDialogClose = (confirmed: boolean) => {
    setShowDiscardDialog(false);
    if (confirmed) {
      onClose?.(false);
    }
  };
  return (
    <>
      <Dialog onOpenChange={handleClose} open={open}>
        <DialogContent className="max-w-3xl p-3" showClose={false}>
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 px-2">
            <div className="flex items-center gap-2">
              <DialogClose asChild>
                <Button className="shrink-0" size="icon" variant="ghost">
                  <X className="size-4" />
                </Button>
              </DialogClose>
              <DialogTitle>Referral Request Details</DialogTitle>
              <DialogDescription className="sr-only">
                Referral Request Details Approval
              </DialogDescription>
            </div>
            <Button size="icon" variant="ghost">
              <MoreVertical className="size-4" />
            </Button>
          </DialogHeader>
          <ScrollArea className="max-h-[70dvh]">
            <Tabs
              className="w-full"
              defaultValue="procedure"
              onValueChange={setActiveTab}
              value={activeTab}
            >
              <TabsList className="flex w-full items-center gap-8 rounded-none border-0 bg-transparent p-0">
                <TabsTrigger
                  className="group flex items-center gap-2 rounded-none border-0 px-0 py-2 focus:ring-0 focus-visible:ring-0 data-[state=active]:bg-transparent"
                  value="procedure"
                >
                  <div className="flex size-5 items-center justify-center rounded-full border-2 border-gray-300 group-data-[state=active]:border-primary">
                    <div className="size-2.5 rounded-full group-data-[state=active]:bg-primary" />
                  </div>
                  Procedure Code
                </TabsTrigger>
                <TabsTrigger
                  className="group flex items-center gap-2 rounded-none border-0 px-0 py-2 data-[state=active]:bg-transparent"
                  value="rendering"
                >
                  <div className="flex size-5 items-center justify-center rounded-full border-2 border-gray-300 group-data-[state=active]:border-primary">
                    <div className="size-2.5 rounded-full group-data-[state=active]:bg-primary" />
                  </div>
                  Rendering Provider
                </TabsTrigger>
                <TabsTrigger
                  className="group flex items-center gap-2 rounded-none border-0 px-0 py-2 data-[state=active]:bg-transparent"
                  value="attachment"
                >
                  <div className="flex size-5 items-center justify-center rounded-full border-2 border-gray-300 group-data-[state=active]:border-primary">
                    <div className="size-2.5 rounded-full group-data-[state=active]:bg-primary" />
                  </div>
                  Attachment Document
                </TabsTrigger>
              </TabsList>

              <TabsContent className="mt-4 border-0 p-0" value="procedure">
                <ProcedureCodeSelector />
              </TabsContent>

              <TabsContent className="border-0 p-0" value="rendering">
                <RenderingProviderSelect />
              </TabsContent>

              <TabsContent className="border-0 p-0" value="attachment">
                <AttachmentDocument />
              </TabsContent>
            </Tabs>
          </ScrollArea>
          <div className="ms-auto flex gap-2 pt-4">
            <Button disabled={activeTab === tabs[0]} onClick={handleBack} variant="outline">
              Back
            </Button>
            {activeTab === tabs[tabs.length - 1] ? (
              <Button variant="default">Review</Button>
            ) : (
              <Button
                disabled={activeTab === tabs[tabs.length - 1]}
                onClick={handleNext}
                variant="default"
              >
                Next
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <DiscardDialog
        onClose={(confirmed?: boolean) => handleDiscardDialogClose(confirmed!)}
        open={showDiscardDialog}
      />
    </>
  );
}
