import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import type { CalendarEvent } from "@/constant/types/calendar";

type SmallCalendarProps = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  events: CalendarEvent[];
};

export default function SmallCalendar({ date, setDate, events }: SmallCalendarProps) {
  const todayEventData = events.filter(event => {
    return (
      event.date.getDate() === date?.getDate() &&
      event.date.getMonth() === date?.getMonth() &&
      event.date.getFullYear() === date?.getFullYear()
    );
  });

  const tomorrowEventData = events.filter(event => {
    const tomorrow = new Date(date ?? new Date());
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
      event.date.getDate() === tomorrow.getDate() &&
      event.date.getMonth() === tomorrow.getMonth() &&
      event.date.getFullYear() === tomorrow.getFullYear()
    );
  });

  return (
    <div className="flex w-fit flex-col bg-white p-5">
      <Calendar className="rounded-md" mode="single" onSelect={setDate} selected={date} />
      <Separator className="mb-5" />
      <div className="flex flex-col gap-2">
        <p className="mb-5 text-sm font-semibold">Upcoming Events</p>
        <div className="mb-5 flex flex-col space-y-3">
          <p className="text-xs font-medium">Today</p>
          {todayEventData.map(event => (
            <Badge
              className="flex items-center justify-between !rounded-md bg-yellow-300 hover:!bg-yellow-300"
              key={event.id}
            >
              <div className="flex items-center gap-x-2">
                <span className="size-2 rounded-full bg-yellow-500" />
                <span className="text-xs">{event.title}</span>
              </div>
              <span className="text-xs font-medium">{event.time}</span>
            </Badge>
          ))}
        </div>
        <div className="flex flex-col space-y-3">
          <p className="text-xs font-medium">Tomorrow</p>
          {tomorrowEventData.map(event => (
            <Badge
              className="flex items-center justify-between !rounded-md bg-[#E9F7EF] text-[#27AA63] hover:!bg-[#E9F7EF]"
              key={event.id}
            >
              <div className="flex items-center gap-x-2">
                <span className="size-2 rounded-full bg-[#27AA63]" />
                <span className="text-xs">{event.title}</span>
              </div>
              <span className="text-xs font-medium">{event.time}</span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
