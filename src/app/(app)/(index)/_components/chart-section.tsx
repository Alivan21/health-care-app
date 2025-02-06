import React from "react";
import AreaCharts from "./charts/dashboard/area-charts";
import ReferralInsight from "./charts/dashboard/referral-insight";
import OrdersChart from "./charts/dashboard/orders-chart";
import TodayActivity from "./charts/dashboard/today-activity";

export default function ChartSection() {
  return (
    <div className="grid w-full grid-cols-2 gap-4 bg-white">
      <AreaCharts />
      <ReferralInsight />
      <OrdersChart />
      <TodayActivity />
    </div>
  );
}
