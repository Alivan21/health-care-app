import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: "STAT" | "Urgent" | "Routine" | "SUCCESS";
  text?: string;
  className?: string;
};

type StatusIncomingBadgeProps = {
  status: "new" | "pending" | "approved" | "completed" | "denied";
  text?: string;
  className?: string;
};

export default function StatusBadge({ status, text, className }: StatusBadgeProps) {
  const statusStyles = {
    STAT: "bg-red-100 text-red-800 hover:bg-red-100",
    Urgent: "bg-orange-100 text-orange-800 hover:bg-orange-100",
    Routine: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    SUCCESS: "bg-green-100 text-green-800 hover:bg-green-100",
  };

  return (
    <Badge
      className={cn("rounded-md font-semibold", statusStyles[status], className)}
      variant="secondary"
    >
      {text ? text : status}
    </Badge>
  );
}

export function StatusIncomingBadge({ status, text, className }: StatusIncomingBadgeProps) {
  const statusStyles = {
    new: "bg-[#FFF4F3] text-red-800 hover:bg-[#FFF4F3]",
    pending: "bg-[#FFFAF5] text-orange-800 hover:bg-[#FFFAF5]",
    approved: "bg-red-100 text-green-800 hover:bg-red-100",
    completed: "bg-green-100 text-green-800 hover:bg-green-100",
    denied: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  return (
    <Badge
      className={cn("rounded-md font-semibold", statusStyles[status], className)}
      variant="secondary"
    >
      {text ? text : status}
    </Badge>
  );
}
