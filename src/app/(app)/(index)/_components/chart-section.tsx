import React from "react";
import OrdersChart from "./charts/dashboard/orders-chart";
import TodayActivity from "./charts/dashboard/today-activity";
import FunnelChartPage from "./charts/apexchart-dashboard/funnel-chart-index";
import ReferralInsightChart from "./charts/apexchart-dashboard/referral-insight-chart";

export default function ChartSection() {
  return (
    <div className="grid w-full grid-cols-2 gap-4 bg-white">
      <FunnelChartPage />
      <ReferralInsightChart />
      <OrdersChart />
      <TodayActivity />
    </div>
  );
}
