"use client";
import MedicalCard from "@/components/cards/medical-card";
import { PageHeader } from "@/components/layouts/header";
import MainContainer from "@/components/layouts/main-container";
import Title from "@/components/layouts/title";
import { SegmentedControl } from "@/components/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Columns3, Kanban, User, Users } from "lucide-react";
import { useState } from "react";

const breadcrumbs = [
  { title: "Dashboard", link: "/" },
  { title: "All Queue", link: "/referrals" },
];

export default function ReferralsPage() {
  const [queue, setQueue] = useState("all");
  const [view, setView] = useState("kanban");
  const [status, setStatus] = useState("outgoing");

  const ViewOptions = [
    {
      label: "Kanban View",
      value: "kanban",
      icon: Columns3,
    },
    {
      label: "List View",
      value: "list",
      icon: Kanban,
    },
  ];

  const QueueOptions = [
    {
      label: "All Queue",
      value: "all",
      icon: Users,
    },
    {
      label: "My Queue",
      value: "my",
      icon: User,
    },
  ];

  const StatusOptions = [
    {
      label: "Outgoing",
      value: "outgoing",
    },
    {
      label: "Incoming",
      value: "incoming",
    },
  ];

  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} />
      <MainContainer className="flex flex-col !p-0">
        <section className="flex !w-auto flex-col gap-4 bg-white px-8 py-6">
          <Title description="Lorem ipsum dolor sit amet consectetur" title="Referrals" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SegmentedControl
                onChange={setView}
                options={ViewOptions}
                value={view}
                variant="icon"
              />
              <SegmentedControl
                onChange={setQueue}
                options={QueueOptions}
                value={queue}
                variant="both"
              />
              <Button size="rounded" variant="secondary">
                Draft{" "}
                <Badge
                  className="ml-auto size-5 justify-center rounded-md px-0"
                  variant="destructive"
                >
                  1
                </Badge>
              </Button>
              <Select defaultValue="all">
                <SelectTrigger className="w-28" variant="default">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approve">Approve</SelectItem>
                  <SelectItem value="complete">Completed</SelectItem>
                  <SelectItem value="denied">Denied</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <SegmentedControl
                onChange={setStatus}
                options={StatusOptions}
                value={status}
                variant="text"
              />
            </div>
          </div>
        </section>
        <ScrollArea className="w-full">
          <section className="flex gap-4 px-8 py-6">
            <ScrollArea className="relative flex max-h-screen w-fit flex-col gap-4 overflow-auto rounded-lg bg-secondary">
              <div className="sticky top-0 flex gap-2 bg-secondary p-2">
                <span className="w-1.5 rounded-lg bg-gray-500" />
                <div className="space-x-2">
                  <span>New</span>
                  <Badge className="rounded-lg px-1.5">3</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <MedicalCard />
                <MedicalCard />
                <MedicalCard />
              </div>
            </ScrollArea>
            <ScrollArea className="relative flex max-h-screen w-fit flex-col gap-4 overflow-auto rounded-lg bg-secondary">
              <div className="sticky top-0 flex gap-2 bg-secondary p-2">
                <span className="w-1.5 rounded-lg bg-yellow-300" />
                <div className="space-x-2">
                  <span>Pending</span>
                  <Badge className="rounded-lg px-1.5">2</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <MedicalCard />
                <MedicalCard />
              </div>
            </ScrollArea>
            <ScrollArea className="relative flex max-h-screen w-fit flex-col gap-4 overflow-auto rounded-lg bg-secondary">
              <div className="sticky top-0 flex gap-2 bg-secondary p-2">
                <span className="w-1.5 rounded-lg bg-primary" />
                <div className="space-x-2">
                  <span>Approve</span>
                  <Badge className="rounded-lg px-1.5">3</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <MedicalCard />
                <MedicalCard />
                <MedicalCard />
              </div>
            </ScrollArea>
            <ScrollArea className="relative flex max-h-screen w-fit flex-col gap-4 overflow-auto rounded-lg bg-secondary">
              <div className="sticky top-0 flex gap-2 bg-secondary p-2">
                <span className="w-1.5 rounded-lg bg-green-500" />
                <div className="space-x-2">
                  <span>Complete</span>
                  <Badge className="rounded-lg px-1.5">4</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <MedicalCard />
                <MedicalCard />
                <MedicalCard />
                <MedicalCard />
              </div>
            </ScrollArea>
            <ScrollArea className="relative flex max-h-screen w-fit flex-col gap-4 overflow-auto rounded-lg bg-secondary">
              <div className="sticky top-0 flex gap-2 bg-secondary p-2">
                <span className="w-1.5 rounded-lg bg-destructive" />
                <div className="space-x-2">
                  <span>Denied</span>
                  <Badge className="rounded-lg px-1.5">3</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <MedicalCard />
                <MedicalCard />
                <MedicalCard />
              </div>
            </ScrollArea>
          </section>
        </ScrollArea>
      </MainContainer>
    </>
  );
}
