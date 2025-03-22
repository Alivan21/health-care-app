'use client';

import MainContainer from "@/components/layouts/main-container";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncomingSection from "../referrals/_components/incoming/incoming-section";

export default function EfaxClient() {
  return (
    <MainContainer className="flex flex-col">
      <div className="mb-4 grow px-2">
        <h1 className="text-2xl font-bold text-[#1E1E1E]">eFax</h1>
        <p className="text-base text-[#4B5563]">Send and receive faxes online</p>
      </div>

      <Tabs className="mb-3 ml-2 max-w-fit rounded-lg border border-[#E8EEF3]">
        <TabsList className="grid w-full grid-cols-2 gap-2 rounded-lg bg-white">
          <TabsTrigger className="drop-shadow" value="all">
            Inbox
          </TabsTrigger>
          <TabsTrigger className="drop-shadow" value="oldest">
            Sent
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <IncomingSection className="!p-0" />
    </MainContainer>
  );
}
