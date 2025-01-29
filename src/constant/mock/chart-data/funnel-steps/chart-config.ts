import type { ChartConfig } from "@/components/ui/chart";

export const chartConfig = {
  Review: {
    label: "Review",
    color: "#6893FF",
  },
  Received: {
    label: "Received",
    color: "#9CBEFF",
  },
  Submitted: {
    label: "Submitted",
    color: "#C5D9FF",
  },
  Completed: {
    label: "Completed",
    color: "#E5EEFF",
  },
} satisfies ChartConfig;
