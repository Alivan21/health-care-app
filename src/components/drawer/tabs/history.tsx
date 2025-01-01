import { Check } from "lucide-react";

interface TimelineItemProps {
  date: string;
  title: string;
}

function TimelineItem({ date, title }: TimelineItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-primary">
        <Check className="size-4" />
      </div>
      <div>
        <div className="text-sm text-muted-foreground">{date}</div>
        <div className="font-medium">{title}</div>
      </div>
    </div>
  );
}

export function HistoryTimeline() {
  return (
    <div className="space-y-4">
      <TimelineItem date="16 November 2024" title="Assign to Dr. Jhon Doe" />
      <TimelineItem date="16 November 2024" title="Internal Approval" />
      <TimelineItem date="16 November 2024" title="Insurance Approval" />
      <TimelineItem date="16 November 2024" title="Schedule on 18 November 2024" />
      <TimelineItem date="16 November 2024" title="Completed" />
    </div>
  );
}
