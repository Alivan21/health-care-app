'use client';

import dynamic from "next/dynamic";
import React from "react";
import OrdersChart from "./charts/dashboard/orders-chart";
import TodayActivity from "./charts/dashboard/today-activity";
import ReferralInsightChart from "./charts/apexchart-dashboard/referral-insight-chart";
const FunnelChart = dynamic(() => import("./charts/apexchart-dashboard/funnel-chart-index").then(mod => mod.default), { ssr: false });

export default function ChartSection() {
  return (
    <div className="grid w-full grid-cols-2 gap-4 bg-white">
      <FunnelChart />
      <ReferralInsightChart />
      <OrdersChart />
      <TodayActivity />
    </div>
  );
}
