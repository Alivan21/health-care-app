import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ScrollButtonProps = {
  position: "left" | "right";
  onClick: () => void;
};

export default function ScrollHorizontalButton({ position, onClick }: ScrollButtonProps) {
  return (
    <div
      className={`${position === "left" ? "left-0" : "right-0"} absolute top-0 z-30 flex h-full w-12 cursor-pointer items-center opacity-0 transition-all duration-300 hover:opacity-100`}
    >
      <Button
        aria-label="Scroll left"
        className="mx-2 shadow-md"
        onClick={onClick}
        size="icon"
        variant="primaryOutline"
      >
        {position === "left" ? (
          <ChevronLeft className="size-4" />
        ) : (
          <ChevronRight className="size-4" />
        )}
      </Button>
    </div>
  );
}
