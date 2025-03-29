"use client";

import { useState } from "react";
// import { AppointmentModal } from "@/components/appointment-modal"

import { AppointmentModal } from "./_components/appointment-modal";
import { Calendar } from "@/components/calendar/calendar";
import SmallCalendar from "./_components/small-calendar";
import type { CalendarEvent } from "@/constant/types/calendar";

export default function CalendarClient() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [bigCalendarDate, setBigCalendarDate] = useState<Date | undefined>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Lorem ipsum",
      time: "10:00",
      date: new Date(2025, 2, 19, 10, 0),
    },
    {
      id: "2",
      title: "Lorem ipsum",
      time: "11:00",
      date: new Date(2025, 2, 19, 11, 0),
    },
    {
      id: "3",
      title: "Team Meeting",
      time: "13:00",
      date: new Date(2025, 2, 19, 13, 0),
    },
    {
      id: "4",
      title: "Project Review",
      time: "15:00",
      date: new Date(2025, 2, 19, 15, 0),
    },
    {
      id: "5",
      title: "Test Event",
      time: "15:00",
      date: new Date(2025, 2, 20, 15, 0),
    },
  ]);

  const handleSaveEvent = (newEvent: CalendarEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  return (
    <div className="flex size-full">
      <SmallCalendar date={date} events={events} setDate={setDate} />
      <Calendar
        events={events}
        initialView="month"
        onDateClick={date => {
          console.log("Date clicked:", date);
          setBigCalendarDate(date);
          setIsOpen(true);
        }}
        onEventClick={event => {
          console.log("Event clicked:", event);
          setBigCalendarDate(event.date);
          setIsOpen(true);
        }}
      />
      <AppointmentModal
        date={bigCalendarDate}
        event={events[0]}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onDelete={id => console.log("Delete event with id:", id)}
        onSave={handleSaveEvent}
      />
    </div>
  );
}
