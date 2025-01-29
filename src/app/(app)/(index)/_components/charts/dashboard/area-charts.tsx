"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig } from "@/constant/mock/chart-data/funnel-steps/chart-config";
import { FunnelStepsChartData } from "@/constant/mock/chart-data/funnel-steps/chart-data";
import { SelectOptionsProps } from "@/constant/types/general";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import ChartLayout from "../chart-layout";
import { ChartSpline } from "lucide-react";

export default function AreaCharts() {
  const [timeRange, setTimeRange] = useState("15d");
  const timeOptions: SelectOptionsProps[] = [
    {
      label: "Last 3 Days",
      value: "3d",
    },
    {
      label: "Last 7 Days",
      value: "7d",
    },
    {
      label: "Last 15 Days",
      value: "15d",
    },
  ];

  const filteredData = FunnelStepsChartData.filter(item => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-04-15");
    let daysToSubtract = 15;
    if (timeRange === "7d") {
      daysToSubtract = 7;
    } else if (timeRange === "3d") {
      daysToSubtract = 3;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <ChartLayout
      title="Funnel Steps"
      icon={<ChartSpline className="size-3 text-[#1757F7]" />}
      isSelectFilter
      selectProps={{
        options: timeOptions,
        selectedOption: timeRange,
        setSelectedOption: setTimeRange,
        selectTriggerPlaceholder: "Last 3 Days",
      }}
    >
      <ChartContainer config={chartConfig} className="h-max w-full max-w-[380px]">
        <AreaChart accessibilityLayer data={filteredData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={20}
            tickFormatter={value => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={5} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={value => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
                indicator="dot"
              />
            }
          />
          <Area dataKey="Review" type="natural" fill="#6893FF" stroke="#6893FF" stackId="a" />
          <Area dataKey="Received" type="natural" fill="#9CBEFF" stroke="#9CBEFF" stackId="a" />
          <Area dataKey="Submitted" type="natural" fill="#C5D9FF" stroke="#C5D9FF" stackId="a" />
          <Area dataKey="Completed" type="natural" fill="#E5EEFF" stroke="#E5EEFF" stackId="a" />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </ChartLayout>
  );
}
