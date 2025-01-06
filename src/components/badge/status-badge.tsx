import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: "STAT" | "Urgent" | "Routine" | "SUCCESS";
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
