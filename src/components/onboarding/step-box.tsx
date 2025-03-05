import { EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";

type StepBoxProps = {
  step: number;
  setStep: (value: number) => void;
  description?: string;
  totalStep: number;
  setProgress: (value: number[]) => void;
};

export default function StepBox({
  step = 1,
  setStep,
  description,
  totalStep,
  setProgress,
}: StepBoxProps) {
  useEffect(() => {
    setProgress([Math.round((step / totalStep) * 100)]);
  }, [setProgress, step, totalStep]);

  const handleChangeStep = () => {
    setStep(step + 1);
    setProgress([Math.round(((step + 1) / totalStep) * 100)]);
  };

  const handleSkipSteps = () => {
    setProgress([999]);
  };

  return (
    <div className="flex w-full max-w-80 flex-col space-y-4 rounded-xl bg-[#1757F7] p-5 text-white">
      <div className="absolute left-10 top-[-8px] size-5 -translate-x-1/2 rotate-45 bg-[#1757F7]" />

      <span className="flex text-sm font-normal">
        Step {step}
        <p className="pl-1 opacity-50">of {totalStep}</p>
      </span>
      <p className="text-base font-normal leading-6">
        {description ||
          "Lorem ipsum dolor sit amet consectetur. Ornare feugiat elit malesuada imperdiet vitae amet fames dignissim."}
      </p>
      <div className="flex w-full items-center justify-between">
        <Button
          className="flex items-center space-x-1 !p-0"
          onClick={handleSkipSteps}
          variant="link"
        >
          <EyeOff className="size-4 opacity-60" />
          <p className="text-sm font-normal text-white">Skip this step</p>
        </Button>
        <Button className="!bg-white text-[#1757F7]" onClick={handleChangeStep}>
          {step === totalStep ? "Done" : "Next"}
        </Button>
      </div>
    </div>
  );
}
