import { useEffect, useState } from "react";

type UseOnboardingProps = {
  onboarding_key: string;
  progress: number[];
  isTimeout?: boolean;
  timeout?: number;
};

export function useOnboarding({
  onboarding_key,
  progress,
  isTimeout = false,
  timeout = 1000,
}: UseOnboardingProps) {
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnboarded(localStorage.getItem(onboarding_key) === "true");
    }
  }, [onboarding_key]);

  useEffect(() => {
    if (progress.some(p => p > 100)) {
      if (typeof window !== "undefined") {
        localStorage.setItem(onboarding_key, "true");
      }

      if (isTimeout) {
        const timer = setTimeout(() => {
          setIsOnboarded(true);
        }, timeout);

        return () => clearTimeout(timer);
      } else {
        setIsOnboarded(true);
      }
    }
  }, [isTimeout, onboarding_key, progress, timeout]);

  return { isOnboarded };
}
