import StatusBadge from "@/components/badge/status-badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, MessageSquare, Paperclip } from "lucide-react";
import { DiscussionThread } from "./discussion";
import { FileList } from "./file";
import { HistoryTimeline } from "./history";

export default function TabsSection() {
  return (
    <Tabs className="mt-5 flex flex-1 flex-col" defaultValue="discussion">
      <TabsList className="justify-start rounded-none border-b bg-white px-0 text-start">
        <TabsTrigger
          className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:scale-x-100"
          value="discussion"
        >
          <MessageSquare className="mr-2 size-4" />
          Discussion
          <StatusBadge className="ms-1" status="STAT" text="1" />
        </TabsTrigger>
        <TabsTrigger
          className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:scale-x-100"
          value="attachments"
        >
          <Paperclip className="mr-2 size-4" />
          Attachments
          <StatusBadge className="ms-1" status="STAT" text="2" />
        </TabsTrigger>
        <TabsTrigger
          className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:scale-x-100"
          value="history"
        >
          <History className="mr-2 size-4" />
          History
        </TabsTrigger>
      </TabsList>
      <ScrollArea className="flex-1">
        <TabsContent className="m-0 p-6" value="discussion">
          <DiscussionThread />
        </TabsContent>
        <TabsContent className="m-0 p-6" value="attachments">
          <FileList />
        </TabsContent>
        <TabsContent className="m-0 p-6" value="history">
          <HistoryTimeline />
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
}
