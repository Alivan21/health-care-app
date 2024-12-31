import Title from "@/components/layouts/title";
import { SegmentedControl } from "@/components/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Columns3, Kanban, User, Users } from "lucide-react";

interface ReferralHeaderProps {
  queue: string;
  setQueue: (value: string) => void;
  view: string;
  setView: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}

export default function ReferralHeader({
  queue,
  setQueue,
  view,
  setView,
  status,
  setStatus,
}: ReferralHeaderProps) {
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
    <section className="flex !w-auto flex-col gap-4 bg-white px-8 py-6">
      <Title description="Lorem ipsum dolor sit amet consectetur" title="Referrals" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SegmentedControl onChange={setView} options={ViewOptions} value={view} variant="icon" />
          <SegmentedControl
            onChange={setQueue}
            options={QueueOptions}
            value={queue}
            variant="both"
          />
          <Button size="rounded" variant="secondary">
            Draft{" "}
            <Badge className="ml-auto size-5 justify-center rounded-md px-0" variant="destructive">
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
  );
}
