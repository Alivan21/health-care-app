import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PatientTypes } from "@/constant/types/patient";
import { Ellipsis } from "lucide-react";

interface PatientProps {
  props: Pick<PatientTypes, "name" | "birthdate" | "id">;
  onCardClick: (id: string) => void;
}

export default function PatientListCard({
  props: { name, birthdate, id },
  onCardClick,
}: PatientProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(birthdate));

  return (
    <Card
      className="w-56 cursor-pointer !border !border-[#E8EEF3] px-4 py-3"
      onClick={() => onCardClick(id)}
    >
      <CardHeader className="!flex !flex-row !items-center !justify-between !p-0">
        <Avatar>
          <AvatarImage alt="User Profile" className="size-8" src="/img/user-profile-1.svg" />
          <AvatarFallback>Up</AvatarFallback>
        </Avatar>
        <Ellipsis className="size-5" />
      </CardHeader>
      <CardContent className="!space-y-1 !p-0 text-start">
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs font-normal">Register, {formattedDate}</p>
      </CardContent>
    </Card>
  );
}
