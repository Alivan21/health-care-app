"use client";

import ReferralDrawer from "@/components/drawer/referral";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import MedicalCard from "../ui/medical-card";

export default function KanbanReferral() {
  const [open, setOpen] = useState(false);

  const handleOpenDrawer = () => {
    setOpen(true);
  };
  return (
    <>
      <ReferralDrawer onClose={() => setOpen(false)} open={open} />
      <ScrollArea className="w-full">
        <section className="flex gap-4 px-8 py-6">
          <ScrollArea className="relative flex max-h-screen w-fit flex-col gap-4 overflow-auto rounded-lg bg-secondary">
            <div className="sticky top-0 z-20 flex gap-2 bg-secondary p-2">
              <span className="w-1.5 rounded-lg bg-gray-500" />
              <div className="space-x-2">
                <span>New</span>
                <Badge className="rounded-lg px-1.5">3</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <MedicalCard onCardClick={handleOpenDrawer} />
              <MedicalCard onCardClick={handleOpenDrawer} />
              <MedicalCard onCardClick={handleOpenDrawer} />
            </div>
          </ScrollArea>
          <ScrollArea className="relative flex max-h-screen w-fit flex-col gap-4 overflow-auto rounded-lg bg-secondary">
            <div className="sticky top-0 z-20 flex gap-2 bg-secondary p-2">
              <span className="w-1.5 rounded-lg bg-yellow-300" />
              <div className="space-x-2">
                <span>Pending</span>
                <Badge className="rounded-lg px-1.5">2</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <MedicalCard isAssigned onCardClick={handleOpenDrawer} />
              <MedicalCard isAssigned onCardClick={handleOpenDrawer} />
            </div>
          </ScrollArea>
          <ScrollArea className="relative flex max-h-screen w-fit flex-col gap-4 overflow-auto rounded-lg bg-secondary">
            <div className="sticky top-0 z-20 flex gap-2 bg-secondary p-2">
              <span className="w-1.5 rounded-lg bg-primary" />
              <div className="space-x-2">
                <span>Approve</span>
                <Badge className="rounded-lg px-1.5">3</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <MedicalCard isAssigned onCardClick={handleOpenDrawer} />
              <MedicalCard isAssigned onCardClick={handleOpenDrawer} />
              <MedicalCard isAssigned onCardClick={handleOpenDrawer} />
            </div>
          </ScrollArea>
          <ScrollArea className="relative flex max-h-screen w-fit flex-col gap-4 overflow-auto rounded-lg bg-secondary">
            <div className="sticky top-0 z-20 flex gap-2 bg-secondary p-2">
              <span className="w-1.5 rounded-lg bg-green-500" />
              <div className="space-x-2">
                <span>Complete</span>
                <Badge className="rounded-lg px-1.5">4</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <MedicalCard isAssigned onCardClick={handleOpenDrawer} />
              <MedicalCard isAssigned onCardClick={handleOpenDrawer} />
              <MedicalCard isAssigned onCardClick={handleOpenDrawer} />
              <MedicalCard isAssigned onCardClick={handleOpenDrawer} />
            </div>
          </ScrollArea>
          <ScrollArea className="relative flex max-h-screen w-fit flex-col gap-4 overflow-auto rounded-lg bg-secondary">
            <div className="sticky top-0 z-20 flex gap-2 bg-secondary p-2">
              <span className="w-1.5 rounded-lg bg-destructive" />
              <div className="space-x-2">
                <span>Denied</span>
                <Badge className="rounded-lg px-1.5">3</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <MedicalCard isAssigned onCardClick={handleOpenDrawer} />
              <MedicalCard isAssigned onCardClick={handleOpenDrawer} />
              <MedicalCard onCardClick={handleOpenDrawer} />
            </div>
          </ScrollArea>
        </section>
      </ScrollArea>
    </>
  );
}
