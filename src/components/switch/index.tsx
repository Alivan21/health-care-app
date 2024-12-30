"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface SegmentedControlOption {
  label: string;
  value: string;
  icon?: LucideIcon;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  /**
   * Determines how the content should be displayed
   * - "text" - Shows only text
   * - "icon" - Shows only icon
   * - "both" - Shows both icon and text
   */
  variant?: "text" | "icon" | "both";
}

export function SegmentedControl({
  options,
  value,
  onChange,
  className,
  variant = "text",
}: SegmentedControlProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-gray-50 bg-gray-50 p-1",
        className
      )}
    >
      {options.map(option => {
        const isSelected = option.value === value;
        const Icon = option.icon;

        const button = (
          <button
            className={cn(
              "relative flex items-center gap-2 rounded-lg transition-colors",
              variant === "icon" ? "p-2" : "px-4 py-1.5",
              isSelected ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
            )}
            key={option.value}
            onClick={() => onChange(option.value)}
          >
            {!!Icon && (variant === "icon" || variant === "both") && <Icon className="size-4" />}
            {(variant === "text" || variant === "both") && (
              <span className="text-sm font-medium">{option.label}</span>
            )}
          </button>
        );

        return variant === "icon" ? (
          <Tooltip key={option.value}>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent>{option.label}</TooltipContent>
          </Tooltip>
        ) : (
          button
        );
      })}
    </div>
  );
}
