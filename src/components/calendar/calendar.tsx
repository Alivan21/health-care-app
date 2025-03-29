"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { CalendarEvent } from "@/constant/types/calendar";

type CalendarView = "month" | "week" | "day";

type CalendarProps = {
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  initialView?: CalendarView;
};

export function Calendar({
  events = [],
  onDateClick,
  onEventClick,
  initialView = "month",
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>(initialView);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  // Get current year and month
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  // Get first day of the month and total days in month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  // Get day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  // Adjust to make Monday the first day of the week
  const startDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;

  // Get days from previous month to fill the first week
  const daysFromPrevMonth = startDay;
  const prevMonth = new Date(currentYear, currentMonth, 0);
  const daysInPrevMonth = prevMonth.getDate();

  // Calculate how many days to show from next month
  const totalDaysToShow = Math.ceil((daysInMonth + startDay) / 7) * 7;
  const daysFromNextMonth = totalDaysToShow - (daysInMonth + startDay);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  const goToPreviousMonth = () => {
    if (view === "month") {
      setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    } else if (view === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 7);
      setCurrentDate(newDate);
    } else if (view === "day") {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 1);
      setCurrentDate(newDate);
    }
  };

  const goToNextMonth = () => {
    if (view === "month") {
      setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    } else if (view === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7);
      setCurrentDate(newDate);
    } else if (view === "day") {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 1);
      setCurrentDate(newDate);
    }
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const generateCalendarDays = () => {
    const days = [];

    for (let i = 0; i < daysFromPrevMonth; i++) {
      const day = daysInPrevMonth - daysFromPrevMonth + i + 1;
      const date = new Date(currentYear, currentMonth - 1, day);
      days.push({ day, date, isCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      days.push({ day: i, date, isCurrentMonth: true });
    }

    for (let i = 1; i <= daysFromNextMonth; i++) {
      const date = new Date(currentYear, currentMonth + 1, i);
      days.push({ day: i, date, isCurrentMonth: false });
    }

    return days;
  };

  const generateWeekDays = () => {
    const days = [];

    const startOfWeek = new Date(currentDate);
    const dayOfWeek = startOfWeek.getDay() || 7;
    startOfWeek.setDate(startOfWeek.getDate() - (dayOfWeek - 1));

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);

      days.push({
        day: date.getDate(),
        date,
        isCurrentMonth: date.getMonth() === currentMonth,
      });
    }

    return days;
  };

  const getHoursForDay = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push({
        hour: i,
        label: i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`,
      });
    }
    return hours;
  };

  const getEventsForHour = (date: Date, hour: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getHours() === hour
      );
    });
  };

  const getDayWithSuffix = (day: number) => {
    if (day % 10 === 1 && day !== 11) return `${day}st`;
    if (day % 10 === 2 && day !== 12) return `${day}nd`;
    if (day % 10 === 3 && day !== 13) return `${day}rd`;
    return `${day}th`;
  };

  const calendarDays = view === "month" ? generateCalendarDays() : generateWeekDays();
  const hours = getHoursForDay();

  const getHeaderText = () => {
    if (view === "month") {
      return `${monthNames[currentMonth]} ${currentYear}`;
    } else if (view === "week") {
      const startOfWeek = new Date(currentDate);
      const dayOfWeek = startOfWeek.getDay() || 7;
      startOfWeek.setDate(startOfWeek.getDate() - (dayOfWeek - 1));
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      const startMonth = startOfWeek.getMonth();
      const endMonth = endOfWeek.getMonth();
      const startYear = startOfWeek.getFullYear();
      const endYear = endOfWeek.getFullYear();

      if (startMonth === endMonth && startYear === endYear) {
        return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${monthNames[startMonth]} ${startYear}`;
      } else if (startYear === endYear) {
        return `${startOfWeek.getDate()} ${monthNames[startMonth]} - ${endOfWeek.getDate()} ${monthNames[endMonth]} ${startYear}`;
      } else {
        return `${startOfWeek.getDate()} ${monthNames[startMonth]} ${startYear} - ${endOfWeek.getDate()} ${monthNames[endMonth]} ${endYear}`;
      }
    } else {
      const day = getDayWithSuffix(currentDay);
      return `${monthNames[currentMonth]} ${day}, ${currentYear}`;
    }
  };

  return (
    <div className="mx-auto w-full max-w-full border border-border bg-inherit">
      {/* Calendar Header */}
      <div className="flex items-center space-x-3 border-b bg-white p-4">
        <div className="flex items-center space-x-2">
          <button
            aria-label={
              view === "month"
                ? "Previous month"
                : view === "week"
                  ? "Previous week"
                  : "Previous day"
            }
            className="rounded-full p-2 hover:bg-gray-100"
            onClick={goToPreviousMonth}
          >
            <ChevronLeft className="size-5 text-gray-500" />
          </button>

          <button
            className="flex items-center rounded-md px-3 py-1.5 text-lg font-medium hover:bg-gray-100"
            onClick={() => setIsDatePickerOpen(true)}
          >
            {getHeaderText()}
          </button>

          <button
            aria-label={
              view === "month" ? "Next month" : view === "week" ? "Next week" : "Next day"
            }
            className="rounded-full p-2 hover:bg-gray-100"
            onClick={goToNextMonth}
          >
            <ChevronRight className="size-5 text-gray-500" />
          </button>
        </div>

        {!!isDatePickerOpen && (
          <>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <div
              className="fixed inset-0 z-40 bg-black/20"
              onClick={() => setIsDatePickerOpen(false)}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  setIsDatePickerOpen(false);
                }
              }}
              role="button"
              tabIndex={0}
            />
            <div className="absolute left-1/2 top-16 z-50 w-80 -translate-x-1/2 rounded-lg border bg-white p-4 shadow-lg">
              {!isYearPickerOpen ? (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <button
                      className="rounded p-1 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedYear(selectedYear - 1);
                        setSelectedMonth(0);
                      }}
                    >
                      <ChevronLeft className="size-4" />
                    </button>

                    <button
                      className="rounded px-2 py-1 text-sm font-medium hover:bg-gray-100"
                      onClick={() => setIsYearPickerOpen(true)}
                    >
                      {selectedYear}
                    </button>

                    <button
                      className="rounded p-1 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedYear(selectedYear + 1);
                        setSelectedMonth(0);
                      }}
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {monthNames.map((month, idx) => (
                      <button
                        className={cn(
                          "rounded p-2 text-sm",
                          idx === currentMonth && selectedYear === currentYear
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-gray-100"
                        )}
                        key={month}
                        onClick={() => {
                          const newDate = new Date(selectedYear, idx, 1);
                          setCurrentDate(newDate);
                          setIsDatePickerOpen(false);
                        }}
                      >
                        {month.substring(0, 3)}
                      </button>
                    ))}
                  </div>

                  {view === "day" && (
                    <>
                      <div className="mb-2 mt-4 text-sm font-medium text-gray-500">Select Day</div>
                      <div className="grid grid-cols-7 gap-1">
                        {dayNames.map(day => (
                          <div className="text-center text-xs font-medium text-gray-500" key={day}>
                            {day.substring(0, 1)}
                          </div>
                        ))}

                        {Array.from({
                          length: new Date(selectedYear, selectedMonth + 1, 0).getDate(),
                        }).map((_, idx) => {
                          const day = idx + 1;
                          const date = new Date(selectedYear, selectedMonth, day);
                          const isFirstWeek = idx === 0;
                          const firstDayOffset =
                            new Date(selectedYear, selectedMonth, 1).getDay() || 7;

                          // Add empty cells for the first week
                          const emptyCells = isFirstWeek
                            ? Array.from({ length: firstDayOffset - 1 })
                            : [];

                          return (
                            <>
                              {!!isFirstWeek &&
                                emptyCells.map((_, i) => (
                                  <div className="size-8" key={`empty-${i}`} />
                                ))}
                              <button
                                className={cn(
                                  "flex h-8 w-8 items-center justify-center rounded-full text-sm",
                                  date.getDate() === currentDate.getDate() &&
                                    date.getMonth() === currentDate.getMonth() &&
                                    date.getFullYear() === currentDate.getFullYear()
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-gray-100"
                                )}
                                key={`day-${day}`}
                                onClick={() => {
                                  const newDate = new Date(selectedYear, selectedMonth, day);
                                  setCurrentDate(newDate);
                                  setIsDatePickerOpen(false);
                                }}
                              >
                                {day}
                              </button>
                            </>
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="mb-4 text-sm font-medium">Select Year</div>
                  <div className="grid max-h-60 grid-cols-4 gap-2 overflow-y-auto">
                    {Array.from({ length: 20 }, (_, i) => currentYear - 10 + i).map(year => (
                      <button
                        className={cn(
                          "rounded p-2 text-sm",
                          year === selectedYear
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-gray-100"
                        )}
                        key={year}
                        onClick={() => {
                          setSelectedYear(year);
                          setIsYearPickerOpen(false);
                        }}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="rounded bg-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200"
                  onClick={() => {
                    // Set to today
                    const today = new Date();
                    setCurrentDate(today);
                    setSelectedYear(today.getFullYear());
                    setSelectedMonth(today.getMonth());
                    setIsDatePickerOpen(false);
                  }}
                >
                  Today
                </button>
                <button
                  className="rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90"
                  onClick={() => setIsDatePickerOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}

        <div className="flex items-center space-x-2">
          {/* View Filter */}
          <Select onValueChange={(value: CalendarView) => setView(value)} value={view}>
            <SelectTrigger className="w-[96px]">
              <SelectValue placeholder="Select Filter" />
            </SelectTrigger>
            <SelectContent className="w-[96px]">
              <SelectGroup>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Month View */}
      {view === "month" && (
        <>
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b bg-white">
            {dayNames.map(day => (
              <div
                className="border-r py-2 text-center text-sm font-semibold text-[#383838] last:border-r-0"
                key={day}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 grid-rows-[repeat(6,minmax(100px,1fr))]">
            {calendarDays.map((day, index) => {
              const dateEvents = getEventsForDate(day.date);
              const hasEvents = dateEvents.length > 0;
              const maxEventsToShow = 2;
              const hasMoreEvents = dateEvents.length > maxEventsToShow;

              return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <div
                  className={cn(
                    "relative min-h-[100px] cursor-pointer border-b border-r p-2 last:border-r-0",
                    !day.isCurrentMonth && "cursor-default bg-gray-50/50 text-gray-400"
                  )}
                  key={index}
                  onClick={() => onDateClick && onDateClick(day.date)}
                >
                  <div className="text-sm font-medium text-[#383838]">{day.day}</div>

                  {!!hasEvents && (
                    <div className="mt-2 space-y-1">
                      {dateEvents.slice(0, maxEventsToShow).map(event => (
                        <button
                          className="flex w-full cursor-pointer items-start justify-between space-x-1 text-xs hover:bg-slate-50"
                          key={event.id}
                          onClick={e => {
                            e.stopPropagation();
                            if (onEventClick) onEventClick(event);
                          }}
                        >
                          <div className="flex space-x-1">
                            <div className="mt-1 size-2 rounded-full bg-amber-400" />
                            <div className="flex-1 font-medium">{event.title}</div>
                          </div>
                          <div className="text-gray-500">{event.time}</div>
                        </button>
                      ))}

                      {!!hasMoreEvents && (
                        <div className="text-xs font-medium text-amber-500">
                          +{dateEvents.length - maxEventsToShow} More
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Week View */}
      {view === "week" && (
        <>
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b">
            {calendarDays.map((day, index) => (
              <div className="border-r py-2 text-center last:border-r-0" key={index}>
                <div className="text-sm font-semibold text-[#383838]">{dayNames[index]}</div>
                <div
                  className={cn(
                    "mt-1 text-sm font-semibold text-[#383838]",
                    !day.isCurrentMonth && "text-gray-400"
                  )}
                >
                  {day.day}
                </div>
              </div>
            ))}
          </div>

          {/* Week Grid */}
          <div className="grid min-h-[500px] grid-cols-7">
            {calendarDays.map((day, index) => {
              const dateEvents = getEventsForDate(day.date);
              const hasEvents = dateEvents.length > 0;

              return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <div
                  className={cn(
                    "relative border-r p-2 last:border-r-0",
                    !day.isCurrentMonth && "bg-gray-50/50 text-gray-400"
                  )}
                  key={index}
                  onClick={() => onDateClick && onDateClick(day.date)}
                >
                  {!!hasEvents && (
                    <div className="mt-2 space-y-1">
                      {dateEvents.map(event => (
                        <button
                          className="flex w-full cursor-pointer items-start justify-between space-x-1 rounded bg-amber-50 p-1 text-xs hover:bg-amber-100"
                          key={event.id}
                          onClick={e => {
                            e.stopPropagation();
                            if (onEventClick) {
                              onEventClick(event);
                            }
                          }}
                        >
                          <div className="flex items-center space-x-1">
                            <div className="mt-1 size-2 rounded-full bg-amber-400" />
                            <div className="flex-1 font-medium">{event.title}</div>
                          </div>
                          <div className="text-gray-500">{event.time}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Day View */}
      {view === "day" && (
        <div className="max-h-[600px] overflow-y-auto">
          {hours.map(hour => {
            const hourEvents = getEventsForHour(currentDate, hour.hour);
            const hasEvents = hourEvents.length > 0;

            return (
              <div className="flex border-b last:border-b-0" key={hour.hour}>
                <div className="w-20 border-r py-2 pr-2 text-right text-sm text-gray-500">
                  {hour.label}
                </div>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                <div
                  className="relative min-h-[60px] flex-1 p-2"
                  onClick={() => {
                    const date = new Date(currentDate);
                    date.setHours(hour.hour);
                    if (onDateClick) {
                      onDateClick(date);
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                      const date = new Date(currentDate);
                      date.setHours(hour.hour);
                      if (onDateClick) {
                        onDateClick(date);
                      }
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  {!!hasEvents && (
                    <div className="space-y-1">
                      {hourEvents.map(event => (
                        <button
                          className="flex w-full cursor-pointer flex-col items-start space-x-1 space-y-1 rounded bg-amber-50 py-5 pl-2 text-sm"
                          key={event.id}
                          onClick={e => {
                            e.stopPropagation();
                            if (onEventClick) {
                              onEventClick(event);
                            }
                          }}
                        >
                          <div className="flex items-center space-x-1">
                            <div className="mt-1 size-2 rounded-full bg-amber-400" />
                            <div className="flex-1 font-medium">{event.title}</div>
                          </div>
                          <div className="text-gray-500">{event.time}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
