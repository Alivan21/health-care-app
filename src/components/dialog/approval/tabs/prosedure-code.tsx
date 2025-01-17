/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";
import type { ProcedureCode } from "@/constant/types/referral";

export default function ProcedureCodeSelector({ isDraft }: { isDraft: boolean }) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCodes, setSelectedCodes] = useState<ProcedureCode[]>([]);

  const [availableCodes, setAvailableCodes] = useState<ProcedureCode[]>([
    {
      code: "99204",
      description: "New Patient, Moderate Complexity Visit",
      quantity: 1,
      dateRange: {
        from: new Date(2024, 11, 5),
        to: new Date(2025, 2, 5),
      },
    },
    {
      code: "99214",
      description: "Established Patient, Moderate Complexity Visit",
      quantity: 1,
      dateRange: {
        from: new Date(2024, 11, 5),
        to: new Date(2025, 2, 5),
      },
    },
    {
      code: "99202",
      description: "New Patient, Straightforward Visit",
      quantity: 1,
      dateRange: {
        from: new Date(2024, 11, 5),
        to: new Date(2025, 2, 5),
      },
    },
    {
      code: "99205",
      description: "New Patient, High Complexity Visit",
      quantity: 1,
      dateRange: {
        from: new Date(2024, 11, 5),
        to: new Date(2025, 2, 5),
      },
    },
    {
      code: "99211",
      description: "Established Patient, Minimal Visit",
      quantity: 1,
      dateRange: {
        from: new Date(2024, 11, 5),
        to: new Date(2025, 2, 5),
      },
    },
  ]);

  const handleRemoveSelected = (code: string) => {
    setSelectedCodes(selectedCodes.filter(c => c.code !== code));
  };

  const handleCodeSelection = (code: ProcedureCode) => {
    if (selectedCodes.find(c => c.code === code.code)) {
      setSelectedCodes(selectedCodes.filter(c => c.code !== code.code));
    } else {
      setSelectedCodes([...selectedCodes, { ...code, selected: true }]);
    }
  };

  const handleQuantityChange = (code: string, quantity: number) => {
    setSelectedCodes(selectedCodes.map(c => (c.code === code ? { ...c, quantity: quantity } : c)));
    setAvailableCodes(
      availableCodes.map(c => (c.code === code ? { ...c, quantity: quantity } : c))
    );
  };

  const handleDateRangeChange = (code: string, dateRange: DateRange) => {
    setSelectedCodes(
      selectedCodes.map(c => (c.code === code ? { ...c, dateRange: dateRange } : c))
    );
    setAvailableCodes(
      availableCodes.map(c => (c.code === code ? { ...c, dateRange: dateRange } : c))
    );
  };

  useEffect(() => {
    if (isDraft) {
      setSelectedCodes(availableCodes.slice(0, 3));
    }
  }, [availableCodes, isDraft]);

  return (
    <div className="space-y-1 p-4">
      <button
        className="flex w-full cursor-pointer flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {selectedCodes.length > 0 ? (
              selectedCodes.map(code => (
                <button
                  className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1"
                  key={code.code}
                  onClick={e => {
                    e.stopPropagation();
                    handleRemoveSelected(code.code);
                  }}
                >
                  <span className="text-sm">
                    {code.code}: {code.description}
                  </span>
                  <Button
                    className="size-5 p-0 hover:bg-gray-200"
                    onClick={e => {
                      e.stopPropagation();
                      handleRemoveSelected(code.code);
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    <X className="size-3" />
                  </Button>
                </button>
              ))
            ) : (
              <span>Select Procedure Code</span>
            )}
          </div>
          <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>

      {/* Available Codes */}
      {!!isOpen && (
        <div className="space-y-2 rounded-md border px-3 py-2">
          {availableCodes.map(code => (
            <div className="flex items-center gap-4 rounded-md border p-4" key={code.code}>
              <Checkbox
                checked={selectedCodes.some(c => c.code === code.code)}
                onCheckedChange={() => handleCodeSelection(code)}
              />
              <div className="flex-1 space-y-1">
                <div className="font-medium">{code.code}</div>
                <div className="text-sm text-muted-foreground">{code.description}</div>
              </div>
              <Input
                className="w-20"
                min={1}
                onChange={e => handleQuantityChange(code.code, parseInt(e.target.value))}
                type="number"
                value={code.quantity}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !code.dateRange && "text-muted-foreground"
                    )}
                    variant="outline"
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {code.dateRange?.from ? (
                      code.dateRange.to ? (
                        <>
                          {format(code.dateRange.from, "LLL dd, y")} -{" "}
                          {format(code.dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(code.dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    defaultMonth={code.dateRange?.from}
                    initialFocus
                    mode="range"
                    numberOfMonths={2}
                    onSelect={dateRange =>
                      handleDateRangeChange(
                        code.code,
                        dateRange ?? { from: undefined, to: undefined }
                      )
                    }
                    selected={code.dateRange}
                  />
                </PopoverContent>
              </Popover>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
