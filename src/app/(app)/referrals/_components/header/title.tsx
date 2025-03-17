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
import { usePathname, useRouter } from "next/navigation";

interface ReferralHeaderProps {
  queue: string;
  setQueue: (value: string) => void;
  view: string;
  setView: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  cardStatus: string;
  setCardStatus: (value: string) => void;
}

export default function ReferralHeader({
  queue,
  setQueue,
  view,
  setView,
  status,
  setStatus,
  cardStatus,
  setCardStatus,
}: ReferralHeaderProps) {
  const routes = useRouter();
  const location = usePathname();

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

  const CardStatusOptions = [
    {
      label: "All Status",
      value: "all",
    },
    {
      label: "New",
      value: "new",
    },
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Approved",
      value: "approved",
    },
    {
      label: "Completed",
      value: "completed",
    },
    {
      label: "Denied",
      value: "denied",
    },
  ];

  return (
    <section className="flex !w-auto flex-col gap-4 bg-white px-8 pb-2 pt-4">
      <Title title="Referrals" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SegmentedControl onChange={setView} options={ViewOptions} value={view} variant="icon" />
          <SegmentedControl
            onChange={setQueue}
            options={QueueOptions}
            value={queue}
            variant="both"
          />
          <Button
            onClick={() => routes.push("/referrals/draft")}
            size="rounded"
            variant="secondary"
          >
            Draft{" "}
            <Badge className="ml-auto size-5 justify-center rounded-md px-0" variant="destructive">
              1
            </Badge>
          </Button>
          <Select defaultValue="all" onValueChange={setCardStatus} value={cardStatus}>
            <SelectTrigger className="w-28" variant="default">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {CardStatusOptions.map((data, index) => (
                <SelectItem key={index} value={data.value}>
                  {data.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className={`${location === "/referrals" ? "flex" : "hidden"}`}>
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
