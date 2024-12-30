import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { User2 } from "lucide-react";
import StatusBadge from "../badge/status-badge";
import { Button } from "../ui/button";

export default function MedicalCard() {
  return (
    <Card className="w-full min-w-64 max-w-64 p-4">
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
        <Button className="size-7 rounded-full" size="icon" variant="primaryOutline">
          <User2 className="!size-5" />
        </Button>
      </div>
    </Card>
  );
}
