import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SelectOptionsProps } from "@/constant/types/general";
import { ChartSpline } from "lucide-react";
import { useState } from "react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart, Legend } from "recharts";
import ChartLayout from "../chart-layout";
import { ReferralInsightChartData } from "@/constant/mock/chart-data/referral-insight/chart-data";
import { referralInsightChartConfig } from "@/constant/mock/chart-data/referral-insight/chart-config";

export default function ReferralInsight() {
  const [monthRange, setMonthRange] = useState("january");

  const monthsOptions: SelectOptionsProps[] = [
    {
      label: "January",
      value: "january",
    },
    {
      label: "February",
      value: "february",
    },
    {
      label: "March",
      value: "march",
    },
    {
      label: "April",
      value: "april",
    },
    {
      label: "May",
      value: "may",
    },
    {
      label: "June",
      value: "june",
    },
    {
      label: "July",
      value: "july",
    },
  ];

  const monthData =
    ReferralInsightChartData.find(data => data.month === monthRange) || ReferralInsightChartData[0];
  const total = monthData.Routine + monthData.STAT + monthData.Urgent;

  return (
    <ChartLayout
      title="Referral Insight"
      icon={<ChartSpline className="size-3 text-[#1757F7]" />}
      isSelectFilter
      selectProps={{
        options: monthsOptions,
        selectedOption: monthRange,
        setSelectedOption: setMonthRange,
        selectTriggerPlaceholder: "January",
      }}
    >
      <ChartContainer config={referralInsightChartConfig} className="h-max w-full max-w-[380px]">
        <RadialBarChart
          data={[monthData]}
          innerRadius={60}
          outerRadius={125}
          barSize={60}
          startAngle={0}
          endAngle={360}
        >
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <svg width="300" height="300">
                      <defs>
                        <linearGradient id="text-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#97D4FF" />
                          <stop offset="100%" stopColor="#1757F7" />
                        </linearGradient>
                      </defs>
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 10}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 14}
                          fontSize="24"
                          fontWeight="bold"
                          fill="url(#text-gradient)"
                        >
                          {total}
                        </tspan>
                      </text>
                    </svg>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
          <RadialBar
            dataKey="STAT"
            stackId="a"
            cornerRadius={6}
            fill="#7FABFF"
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="Urgent"
            stackId="a"
            cornerRadius={6}
            fill="#C5D9FF"
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="Routine"
            stackId="a"
            cornerRadius={6}
            fill="#E5EEFF"
            className="stroke-transparent stroke-2"
          />
        </RadialBarChart>
      </ChartContainer>
    </ChartLayout>
  );
}
