// pages/funnel-chart.tsx
"use client"; // This ensures it runs on the client side

import { useEffect, useRef } from "react";
import { createFunnelChart } from "./funnel-chart";
import ChartLayout from "../chart-layout";
import { ChartSpline } from "lucide-react";

export default function FunnelChartPage() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const root = createFunnelChart(chartRef.current.id);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <ChartLayout icon={<ChartSpline className="size-3" />} title="Funnel Steps">
      <div className="relative h-[220px] w-full">
        <div
          className="absolute inset-0 z-10"
          id="chartdiv"
          ref={chartRef}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </ChartLayout>
  );
}
