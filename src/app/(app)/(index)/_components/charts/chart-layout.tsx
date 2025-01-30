"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ChartProps } from "@/constant/types/general";

export default function ChartLayout({
  title,
  icon,
  children,
  isSelectFilter,
  selectProps,
}: ChartProps) {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="size-5 rounded-sm bg-[#1757F7]/5 p-1">{icon}</span>
          <p className="text-base font-medium">{title}</p>
        </div>
        {isSelectFilter && (
          <Select
            value={selectProps?.selectedOption}
            onValueChange={selectProps?.setSelectedOption}
          >
            <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
              <SelectValue placeholder={selectProps?.selectTriggerPlaceholder} />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {selectProps?.options.map(option => (
                <SelectItem value={option.value} className="rounded-lg">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>

      <CardContent className="!p-5">{children}</CardContent>
    </Card>
  );
}
