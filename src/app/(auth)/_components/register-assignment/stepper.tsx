import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type FormStepperProps = {
  step: number;
  totalStep: number;
};

export default function RegisterAssignmentFormStepper({ step, totalStep }: FormStepperProps) {
  return Array.from({ length: totalStep }).map((_, index) => (
    <div className="flex w-full items-center" key={index}>
      <div
        className={cn(
          "flex size-8 items-center justify-center rounded-full border-2",
          index < step
            ? "border-[#4F46E5] bg-[#4F46E5]"
            : index === step
              ? "border-[#4F46E5]"
              : "border-[#D1D5DB]"
        )}
      >
        {index < step ? (
          <Check className="size-4 text-white" fill="#4F46E5" />
        ) : (
          <span
            className={cn("size-2 rounded-full", index === step ? "block bg-[#4F46E5]" : "hidden")}
          />
        )}
      </div>
      {index < totalStep - 1 && (
        <div className={cn("h-[2px] w-10", index < step ? "bg-[#4F46E5]" : "bg-[#D1D5DB]")} />
      )}
    </div>
  ));
}
