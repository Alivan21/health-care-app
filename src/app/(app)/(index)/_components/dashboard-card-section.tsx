import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SquareChevronDown } from "lucide-react";

export type DashboardCardProps = {
  title: string;
  icon: React.ReactNode;
  amount: number;
};

type DashboardCardSectionProps = {
  data: DashboardCardProps[];
  onClick: (title: string) => void;
};

export default function DashboardCardSection({ onClick, data }: DashboardCardSectionProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScrollDown = () => {
    if (scrollRef.current) {
      const rowHeight = scrollRef.current.firstElementChild?.firstElementChild?.clientHeight || 0;
      scrollRef.current.scrollBy({ top: rowHeight + 40, behavior: "smooth" });
    }
  };

  return (
    <ScrollArea className="relative z-10 w-full bg-white">
      <div
        ref={scrollRef}
        className="no-scrollbar grid h-full max-h-[450px] grid-cols-2 gap-3 overflow-y-auto p-1"
      >
        {data.map((data, index) => (
          <Card
            id={data.title}
            key={index}
            className={`cursor-pointer rounded-xl border border-[#F5F6F8] !p-0 ${
              activeCard === data.title ? "!bg-[#F8FBFF] !ring-1 !ring-[#4579F9]" : ""
            }`}
            style={{ boxShadow: "0px 4px 0px #EEEEEE40" }}
            onClick={() => {
              setActiveCard(data.title);
              onClick(data.title);
            }}
          >
            <CardContent className="!flex !flex-col space-y-12 !p-2">
              <div className="flex items-start space-x-1">
                <span className="size-5 rounded-sm bg-[#1757F7]/5 p-1">{data.icon}</span>
                <p className="text-sm font-medium">{data.title}</p>
              </div>
              <p className="self-end text-3xl font-semibold text-[#383838]">{data.amount}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="vertical" />
      <button onClick={handleScrollDown} className="absolute -bottom-1 left-[138px] z-20">
        <SquareChevronDown className="size-6 rounded bg-white p-1 text-[#1757F7] shadow-[0px_1px_2px_rgba(109,109,109,0.25)]" />
      </button>
    </ScrollArea>
  );
}
