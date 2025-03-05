import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";
import CircularProgress from "../circular-progress";

export default function OnboardingProgressBox({
  progress = [0],
  timeout,
}: {
  progress: number[];
  timeout?: number;
}) {
  const [showComponent, setShowComponent] = useState(true);
  const isCompleted = progress.some(p => p > 100);

  useEffect(() => {
    if (isCompleted) {
      setTimeout(() => {
        setShowComponent(false);
      }, timeout || 1000);
    }
  }, [isCompleted, timeout]);

  if (!showComponent) return null;

  return (
    <div
      className={`flex translate-y-4 items-center rounded-full pr-3 text-white opacity-0 ${isCompleted ? "animate-fadeOutDown bg-[#34C759]" : "animate-fadeInUp bg-[#1757F7]"}`}
    >
      {isCompleted ? (
        <>
          <CircleCheck className="size-20 text-[#34C759]" fill="#FFFFFF" />
          <p className="text-lg font-semibold">Onboarding Completed</p>
        </>
      ) : (
        <>
          <CircularProgress
            className="stroke-[#154FE1]"
            progressClassName="stroke-white"
            renderLabel={progress => `${progress}%`}
            showLabel
            size={80}
            strokeWidth={8}
            value={progress[0]}
          />
          <p className="text-lg font-semibold">Onboarding Progress</p>
        </>
      )}
    </div>
  );
}
