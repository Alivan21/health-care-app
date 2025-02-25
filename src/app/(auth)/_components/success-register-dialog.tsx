import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Image from "next/image";

export default function SuccessRegisterDialog({
  setIsDialogOpen,
  setIsIntroduceDialogOpen
}: {
  setIsDialogOpen: (value: boolean) => void;
  setIsIntroduceDialogOpen: (value: boolean) => void;
}) {
  return (
    <div className="rounded-[18px] bg-gray-50/50">
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          {/* Content Grid */}
          <div className="grid items-center md:grid-cols-2">
            {/* Left Column */}
            <div className="flex flex-col items-center space-y-8 px-7">
              <div className="space-y-4 text-center">
                <h1 className="text-2xl font-medium tracking-tight">
                  Enjoy powerful
                  <br />
                  Collaboration as a team
                </h1>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur. Nibh feugiat vitae at hendrerit
                </p>
              </div>

              <div className="space-y-6">
                {[
                  "Lorem ipsum dolor sit amet consectetur. Nibh feugiat vitae at hendrerit tincidunt justo fusce. Tortor porttitor",
                  "Lorem ipsum dolor sit amet consectetur. Nibh feugiat vitae at hendrerit tincidunt justo fusce. Tortor porttitor",
                  "Lorem ipsum dolor sit amet consectetur. Nibh feugiat vitae at hendrerit tincidunt justo fusce. Tortor porttitor",
                ].map((text, index) => (
                  <div className="flex gap-4" key={index}>
                    <div className="mt-2 flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-600">
                      <Check className="size-4 text-white" />
                    </div>
                    <p className="text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>

              <Button
                className="w-full bg-blue-600 px-8 text-white hover:bg-blue-700 md:w-auto"
                onClick={() => {
                  setIsDialogOpen(false)
                  setIsIntroduceDialogOpen(true)
                }}
              >
                Continue
              </Button>
            </div>

            {/* Right Column - Image */}
            <div className="relative size-full">
              <Image
                alt="Medical Professional"
                className="object-contain"
                height={700}
                priority
                src="/img/finish_assignment_illustration.svg"
                width={380}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
