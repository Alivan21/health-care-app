import StatusBadge from "@/components/badge/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MedicalCardTypes } from "@/constant/types/referral";
import { formatDate } from "@/lib/utils";
import { User2 } from "lucide-react";

interface Props {
  cardProps: MedicalCardTypes;
  onCardClick?: (cardData: MedicalCardTypes) => void;
  onUserClick?: (newAssignTo: string) => void;
}

export default function MedicalCard({ onCardClick, onUserClick, cardProps }: Props) {
  const isAssigned = cardProps.assign_to !== "" ? true : false;

  return (
    <Card
      className="relative w-full min-w-64 max-w-64 cursor-pointer p-4"
      onClick={() => onCardClick?.(cardProps)}
    >
      <div
        className={`${cardProps.isTop ? "block" : "hidden"} absolute right-[-5px] top-4 z-10 flex flex-col items-end`}
      >
        <div className="rounded-t-full rounded-bl-full rounded-br-none bg-[#FE4144] pb-[5px] pl-[5px] pr-2 pt-[3px] text-white">
          <p className="text-[9px] font-normal">Top</p>
        </div>
        <div className="relative size-0 border-r-[5px] border-t-[3.66px] border-r-transparent border-t-[#B4492E]" />
      </div>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <StatusBadge status={cardProps.priority} />
          <h2 className="mt-2 text-lg font-semibold">Dr. {cardProps.name}</h2>
        </div>
        <Avatar className="size-8">
          <AvatarImage alt="Avatar" src="/placeholder.svg?height=32&width=32" />
        </Avatar>
      </div>
      <CardContent className="space-y-3 p-0">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Patient name</span>
          <span className="text-sm">{cardProps.patient_name || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Speciality</span>
          <span className="text-sm">{cardProps.speciality || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Assigned to</span>
          <span className={cardProps.assign_to ? "text-sm" : "text-sm text-gray-500"}>
            {cardProps.assign_to || "None"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Created</span>
          <span className="text-sm">
            {cardProps.created_at ? `${formatDate(cardProps.created_at)} days ago` : "Unknown"}
          </span>
        </div>
      </CardContent>
      <div className="mt-4">
        {isAssigned ? (
          <Button size="icon" variant="link">
            <Avatar className="size-8">
              <AvatarImage src="/img/user-profile-1.svg" />
              <AvatarFallback>NB</AvatarFallback>
            </Avatar>
          </Button>
        ) : (
          <Button
            className="z-10 size-7 rounded-full"
            onClick={e => {
              e.stopPropagation();
              onUserClick?.("Ronald Glover");
            }}
            size="icon"
            variant="primaryOutline"
          >
            <User2 className="size-5" />
          </Button>
        )}
      </div>
    </Card>
  );
}
