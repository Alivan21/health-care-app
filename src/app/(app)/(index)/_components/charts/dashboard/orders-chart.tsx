import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ordersChartConfig } from "@/constant/mock/chart-data/orders-chart/chart-config";
import { OrdersChartData } from "@/constant/mock/chart-data/orders-chart/chart-data";
import { SelectOptionsProps } from "@/constant/types/general";
import { ShoppingBasket } from "lucide-react";
import { useState } from "react";
import ChartLayout from "../chart-layout";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Cell } from "recharts";

export default function OrdersChart() {
  const [months, setMonths] = useState("3");

  const monthOptions: SelectOptionsProps[] = [
    {
      label: "Last 3 Months",
      value: "3",
    },
    {
      label: "Last 5 Months",
      value: "5",
    },
    {
      label: "Last 7 Months",
      value: "7",
    },
  ];

  const filterData = (data: typeof OrdersChartData, months: number) => {
    const filteredData = data.slice(-months);
    return Object.entries(ordersChartConfig).map(([key, config]) => ({
      category: config.label,
      value: filteredData.reduce((sum, month) => sum + Number(month[key as keyof typeof month]), 0),
    }));
  };

  const chartData = filterData(OrdersChartData, Number.parseInt(months));

  return (
    <ChartLayout
      title="Orders"
      icon={<ShoppingBasket className="size-3 text-[#1757F7]" />}
      isSelectFilter
      selectProps={{
        options: monthOptions,
        selectedOption: months,
        setSelectedOption: setMonths,
        selectTriggerPlaceholder: "Last 3 Months",
      }}
    >
      <ChartContainer config={ordersChartConfig} className="h-max w-full max-w-[380px]">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="category"
            tickLine={false}
            tickMargin={16}
            axisLine={false}
            interval={0}
            tick={{ fontSize: 12, width: 100 }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="value"
            fill={ordersChartConfig.overdue.color}
            radius={[4, 4, 0, 0]}
            barSize={60}
          >
            {chartData.map((entry, index) => {
              const category = entry.category
                .toLowerCase()
                .replace(" ", "") as keyof typeof ordersChartConfig;
              const color = ordersChartConfig[category]?.color || ordersChartConfig.overdue.color;
              return <Cell key={`cell-${index}`} fill={color} />;
            })}
            <LabelList
              dataKey="value"
              position="top"
              offset={10}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartLayout>
  );
}
