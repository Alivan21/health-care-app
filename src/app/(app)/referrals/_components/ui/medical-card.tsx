import StatusBadge from "@/components/badge/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MedicalCardTypes } from "@/constant/types/referral";
import { formatDate } from "@/lib/utils";
import { User2 } from "lucide-react";
import { useState } from "react";

interface Props {
  cardProps: MedicalCardTypes;
  onCardClick?: (cardData: MedicalCardTypes) => void;
  onUserClick?: (newAssignTo: string) => void;
  onUnassign?: () => void;
}

export default function MedicalCard({ onCardClick, onUserClick, onUnassign, cardProps }: Props) {
  const [isReaded, setIsReaded] = useState(false);
  const isAssigned = cardProps.assign_to !== "" ? true : false;

  return (
    <Card
      className={`relative w-full min-w-64 max-w-64 cursor-pointer !px-3 !py-2 ${isReaded ? "bg-white" : "bg-[#F2F6FF]"}`}
      onClick={() => {
        setIsReaded(true);
        onCardClick?.(cardProps);
      }}
    >
      <div
        className={`${cardProps.isTop ? "block" : "hidden"} absolute right-[-5px] top-4 z-10 flex flex-col items-end`}
      >
        <div className="rounded-t-full rounded-bl-full rounded-br-none bg-[#FE4144] pb-[5px] pl-[5px] pr-2 pt-[3px] text-white">
          <p className="text-[9px] font-normal">Top</p>
        </div>
        <div className="relative size-0 border-r-[5px] border-t-[3.66px] border-r-transparent border-t-[#B4492E]" />
      </div>
      <div className="mb-2 flex justify-between">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-[6px]">
            <Avatar className="!h-fit !w-fit">
              <AvatarImage className="size-5" src="/img/doctor_profile.svg" />
            </Avatar>
            <h2 className="text-xs font-semibold">Dr. {cardProps.name}</h2>
          </div>
          <StatusBadge status={cardProps.priority} />
        </div>
      </div>
      <CardContent className="space-y-2 !p-0">
        <div className="flex justify-between">
          <span className="text-[10px] text-gray-500">Patient name</span>
          <span className="text-[10px]">{cardProps.patient_name || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[10px] text-gray-500">Speciality</span>
          <span className="text-[10px]">{cardProps.speciality || "N/A"}</span>
        </div>
        <div className="flex items-end justify-between">
          <div className="size-5">
            {isAssigned ? (
              <Button
                className="size-5"
                onClick={e => {
                  e.stopPropagation();
                  onUnassign?.();
                }}
                size="icon"
                variant="link"
              >
                <Avatar className="size-5 !h-fit !w-fit">
                  <AvatarImage src="/img/user-profile-1.svg" />
                  <AvatarFallback>NB</AvatarFallback>
                </Avatar>
              </Button>
            ) : (
              <Button
                className="z-10 size-5 rounded-full"
                onClick={e => {
                  e.stopPropagation();
                  onUserClick?.("Nathaniel Brooks");
                }}
                size="icon"
                variant="primaryOutline"
              >
                <User2 className="size-5" />
              </Button>
            )}
          </div>
          <span className="text-[10px]">
            {cardProps.created_at ? `${formatDate(cardProps.created_at)} days ago` : "Unknown"}
          </span>
        </div>
      </CardContent>
      <div
        className={`absolute right-0 top-0 h-full w-1 rounded-r-lg bg-yellow-400 ${isReaded ? "hidden" : "block"}`}
      />
    </Card>
  );
}
