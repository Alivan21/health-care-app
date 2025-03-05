import { useState } from "react";
import StepBox from "./step-box";

type StepBoxContainerProps = {
  stepbox_property: {
    classnamePosition?: string;
    step: number;
    description?: string;
  }[];
  setProgress: (value: number[]) => void;
};

export default function StepBoxContainer({
  stepbox_property = [],
  setProgress,
}: StepBoxContainerProps) {
  const [step, setStep] = useState(1);

  return (
    <>
      {stepbox_property.map(data =>
        data.step === step ? (
          <div
            className={`w-full max-w-80 translate-y-4 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0 ${data.classnamePosition}`}
            key={data.step}
          >
            <StepBox
              description={data.description}
              setProgress={setProgress}
              setStep={setStep}
              step={step}
              totalStep={stepbox_property.length}
            />
          </div>
        ) : null
      )}
    </>
  );
}
