import type { ChartConfig } from "@/components/ui/chart";

export const ordersChartConfig = {
  overdue: {
    label: "Overdue",
    color: "#6893FF",
  },
  denied: {
    label: "Denied",
    color: "#9CBEFF",
  },
  inProcess: {
    label: "In Process",
    color: "#C5D9FF",
  },
  schedule: {
    label: "Schedule",
    color: "#E5EEFF",
  },
} satisfies ChartConfig;
