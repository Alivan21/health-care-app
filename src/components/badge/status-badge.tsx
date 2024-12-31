import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: "STAT" | "URGENT" | "ROUTINE";
  text?: string;
};

export default function StatusBadge({ status, text }: StatusBadgeProps) {
  const statusStyles = {
    STAT: "bg-red-100 text-red-800 hover:bg-red-100",
    URGENT: "bg-orange-100 text-orange-800 hover:bg-orange-100",
    ROUTINE: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  };

  return (
    <Badge className={cn("rounded-md font-semibold", statusStyles[status])} variant="secondary">
      {text ? text : status}
    </Badge>
  );
}
