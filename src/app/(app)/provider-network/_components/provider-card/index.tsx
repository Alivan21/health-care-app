import BasicInformation from "@/components/basic-information";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MedicalCardTypes } from "@/constant/types/referral";
import { Check, HeartPulse, HeartHandshake, CalendarPlus2, ScanSearch } from "lucide-react";

type ProviderCardProps = Pick<
  MedicalCardTypes,
  "name" | "speciality" | "practical_location" | "experience"
>;

export default function ProviderCard({
  name,
  speciality,
  practical_location,
  experience,
}: ProviderCardProps) {
  return (
    <Card className="relative z-0 !border-border !p-4">
      <div className="absolute left-[-5px] top-2 z-10 flex flex-col items-start">
        <div className="rounded-t-full rounded-bl-none rounded-br-full bg-[#FE4144] pb-[5px] pl-[5px] pr-2 pt-[3px] text-white">
          <p className="text-[9px] font-normal">Top</p>
        </div>
        <div className="relative size-0 border-l-[5px] border-t-[3.66px] border-l-transparent border-t-[#B4492E]" />
      </div>
      <CardHeader className="flex !flex-row items-start justify-between !p-0">
        <div className="flex !flex-row items-center space-x-2">
          <Avatar>
            <AvatarImage alt="User Profile" className="size-9 pl-1" src="/img/user-profile-1.svg" />
            <AvatarFallback>Up</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start space-y-1 text-start">
            <p className="text-sm font-semibold">Dr. {name}</p>
            <p className="text-xs font-normal text-gray-600">{speciality} Specialist</p>
          </div>
        </div>

        <div className="flex size-4 items-center justify-center rounded-full border-[0.5px] border-[#BCE5CF] bg-green-50">
          <Check className="size-2 text-green-500" />
        </div>
      </CardHeader>
      <Separator className="my-3" />
      <CardContent className="!p-0">
        <BasicInformation
          data={String(practical_location)}
          icon={<HeartPulse className="mt-[2px] size-3" />}
          placeholder="Location Practical"
          textSize="text-xs"
          wrapperClassName="mb-3"
        />
        <BasicInformation
          data={String(experience)}
          icon={<HeartHandshake className="mt-[2px] size-3" />}
          placeholder="Experience"
          textSize="text-xs"
        />
      </CardContent>
      <Separator className="mb-3 mt-4" />
      <CardFooter className="justify-between !p-0">
        <Button className="border border-[#4579F9] !bg-gradient-to-b from-[#3F76FF] to-[#1757F7] !px-5 !py-2">
          <CalendarPlus2 className="size-[14px]" /> Make an Appointment
        </Button>
        <Button className="!rounded-md border !border-border !bg-transparent !p-2" size="icon">
          <ScanSearch className="size-4 text-[#606060]" />
        </Button>
      </CardFooter>
    </Card>
  );
}
