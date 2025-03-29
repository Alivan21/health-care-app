"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import type { CalendarEvent } from "@/constant/types/calendar";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Bold, Italic, Underline } from "lucide-react";
import { format } from "date-fns";

type AppointmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  onSave: (event: CalendarEvent) => void;
  event: CalendarEvent | null;
  date: Date | undefined;
};

export function AppointmentModal({ isOpen, onClose, onSave, date }: AppointmentModalProps) {
  const [dateState, setDateState] = useState<Date | undefined>(new Date("2025-03-19"));
  const [startTime, setStartTime] = useState("8:00 AM");
  const [endTime, setEndTime] = useState("9:00 AM");

  useEffect(() => {
    if (date) {
      setDateState(date);
      console.log(dateState);
    }
  }, [date, dateState]);

  const handleSave = () => {
    if (!dateState) return;

    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title: "Ferdinand Rio",
      time: startTime,
      date: dateState,
    };

    onSave(newEvent);
    onClose();
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-[605px]">
        <DialogHeader>
          <DialogTitle>Appointment</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col rounded-2xl border border-border p-4">
          <div className="mb-5 flex flex-col space-y-1">
            <h1 className="text-base font-semibold">Add to Calendar</h1>
            <p className="text-sm font-normal">Enter appointment to calendar</p>
          </div>

          <div className="flex items-start space-x-3">
            <Image alt="doctor" height={54} src="/img/doctor_profile.svg" width={54} />
            <div className="flex flex-1 flex-col space-y-1">
              <h1 className="text-lg font-bold">Dr. Ben Carson</h1>
              <div className="flex items-center">
                <Label className="w-40 text-xs font-normal">Speciality</Label>
                <p className="!text-xs font-medium">Cardiac Electrophysiology</p>
              </div>
              <div className="flex items-center">
                <Label className="w-40 text-xs font-normal">Practice Name Downtown</Label>
                <p className="!text-xs font-medium">27 N Academy Ave, Cityville, PA 1782</p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex items-start space-x-3">
            <Image alt="doctor" height={54} src="/img/profile-pict-calendar.svg" width={54} />
            <div className="flex flex-1 flex-col space-y-1">
              <h1 className="text-lg font-bold">Ferdinand Rio</h1>
              <div className="flex items-center">
                <Label className="w-40 text-xs font-normal">Speciality</Label>
                <p className="!text-xs font-medium">Cardiac Electrophysiology</p>
              </div>
              <div className="flex items-center">
                <Label className="w-40 text-xs font-normal">Practice Name Downtown</Label>
                <p className="!text-xs font-medium">27 N Academy Ave, Cityville, PA 1782</p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="mb-2 block text-sm text-muted-foreground">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                    variant="outline"
                  >
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    initialFocus
                    mode="single"
                    onSelect={selectedDate => setDateState(selectedDate)}
                    selected={dateState}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label className="mb-2 block text-sm text-muted-foreground">Start time</Label>
              <Select onValueChange={setStartTime} value={startTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                  <SelectItem value="8:30 AM">8:30 AM</SelectItem>
                  <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                  <SelectItem value="9:30 AM">9:30 AM</SelectItem>
                  <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block text-sm text-muted-foreground">End time</Label>
              <Select onValueChange={setEndTime} value={endTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8:30 AM">8:30 AM</SelectItem>
                  <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                  <SelectItem value="9:30 AM">9:30 AM</SelectItem>
                  <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                  <SelectItem value="10:30 AM">10:30 AM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-5">
            <Label className="mb-2 block text-sm text-muted-foreground">Add a description</Label>
            <div className="space-y-2">
              <Textarea
                className="min-h-[100px]"
                defaultValue="hmmm, I think we need to discuss further"
                placeholder="Add description"
              />
              <div className="flex gap-1">
                <Button className="size-8" size="icon" variant="outline">
                  <Bold className="size-4" />
                </Button>
                <Button className="size-8" size="icon" variant="outline">
                  <Italic className="size-4" />
                </Button>
                <Button className="size-8" size="icon" variant="outline">
                  <Underline className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <div>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
