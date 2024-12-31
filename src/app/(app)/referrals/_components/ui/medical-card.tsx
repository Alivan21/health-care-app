import StatusBadge from "@/components/badge/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User2 } from "lucide-react";

interface Props {
  onCardClick?: () => void;
  onUserClick?: () => void;
  isAssigned?: boolean;
}

export default function MedicalCard({ onCardClick, onUserClick, isAssigned }: Props) {
  return (
    <Card className="w-full min-w-64 max-w-64 cursor-pointer p-4" onClick={onCardClick}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <StatusBadge status="STAT" />
          <h2 className="mt-2 text-lg font-semibold">Dr.Marie Curie</h2>
        </div>
        <Avatar className="size-8">
          <AvatarImage alt="Avatar" src="/placeholder.svg?height=32&width=32" />
        </Avatar>
      </div>
      <CardContent className="space-y-3 p-0">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Patient name</span>
          <span className="text-sm">Alexander Cole</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Speciality</span>
          <span className="text-sm">Gastroenterology</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Assign to</span>
          <span className="text-sm text-gray-500">None</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Created at</span>
          <span className="text-sm">2 Days ago</span>
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
              onUserClick?.();
            }}
            size="icon"
            variant="primaryOutline"
          >
            <User2 className="!size-5" />
          </Button>
        )}
      </div>
    </Card>
  );
}
