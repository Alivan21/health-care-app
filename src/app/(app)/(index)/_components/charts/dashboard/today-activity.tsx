import React from "react";
import ChartLayout from "../chart-layout";
import { ChartSpline, Dot } from "lucide-react";

export default function TodayActivity() {
  const cardData: CardProps[] = [
    {
      title: "Overall",
      status: "20 Referrals Completed",
      duration: "70 min",
      rate: "3 Completions/hour",
    },
    {
      title: "Approval",
      status: "40 Referrals Submitted",
      duration: "40 min",
      rate: "4 Submission/hour",
    },
    {
      title: "Scheduling",
      status: "20 Referrals Scheduled",
      duration: "30 min",
      rate: "3 Scheduling/hour",
    },
  ];

  return (
    <ChartLayout
      title="Today Activity"
      icon={<ChartSpline className="size-3 text-[#1757F7]" />}
      isSelectFilter={false}
    >
      {cardData.map(data => (
        <TodayActivityCard
          title={data.title}
          status={data.status}
          duration={data.duration}
          rate={data.rate}
        />
      ))}
    </ChartLayout>
  );
}

type CardProps = {
  title: string;
  status: string;
  duration: string;
  rate: string;
};

function TodayActivityCard({ title, status, duration, rate }: CardProps) {
  return (
    <div className="mb-2 flex items-center space-x-4 rounded-lg border border-border p-3">
      <p className="w-full max-w-[90px] text-sm font-semibold">{title}</p>
      <div className="h-[42px] w-[2px] bg-gradient-to-t from-[#1757F700] to-[#1757F7]"></div>
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium">{status}</p>
        <div className="flex items-center space-x-1">
          <p className="text-xs font-normal text-[#878787]">{duration}</p>
          <Dot className="size-1 text-[#EDEDED]" />
          <p className="text-xs font-normal text-[#878787]">{rate}</p>
        </div>
      </div>
    </div>
  );
}
