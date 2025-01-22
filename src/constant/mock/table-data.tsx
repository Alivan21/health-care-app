import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import StatusBadge, { StatusIncomingBadge } from "@/components/badge/status-badge";
import { formatDate } from "@/lib/utils";
import { Eye, CircleUserRound } from 'lucide-react';
import type { IncomingTableDataType, MedicalCardTypes } from "@/constant/types/referral";
import HospitalIcon from "@/app/(app)/referrals/_components/incoming/hospital-icon";

export const createMedicalColumns = (
  onCardClick?: (row: MedicalCardTypes) => void,
  onUserClick?: (id: string, name: string) => void,
  onUnassign?: (id: string) => void
): ColumnDef<MedicalCardTypes>[] => [
  {
    accessorKey: "name",
    header: "Doctor Name",
    cell: ({ row }) => {
      const doctor = row.original;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage src="/img/rendering_profile.svg" />
            <AvatarFallback>
              {doctor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span>Dr. {doctor.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "patient_name",
    header: "Patient Name",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const status = row.original.priority;
      return <StatusBadge status={status} />;
    },
  },
  {
    accessorKey: "speciality",
    header: "Speciality",
  },
  {
    accessorKey: "assign_to",
    header: "Assign to",
    cell: ({ row }) => {
      const assign = row.getValue("assign_to");
      return assign === "" ? "None" : assign;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      const created = new Date(row.getValue("created_at"));
      return `${formatDate(created)} Days Ago`;
    },
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      const assign = row.getValue("assign_to");
      const id = row.original.id;
      return (
        <div className="flex gap-2">
          <Button
            className="rounded-md !bg-white drop-shadow"
            onClick={() => onCardClick?.(row.original)}
            size="icon"
          >
            <Eye className="size-4 text-[#4579F9]" />
          </Button>
          {assign !== "" ? (
            <Button 
              onClick={() => onUnassign?.(id)} 
              size="icon"
              variant="link"
            >
              <Avatar className="size-8">
                <AvatarImage src="/img/user-profile-1.svg" />
                <AvatarFallback>NB</AvatarFallback>
              </Avatar>
            </Button>
          ) : (
            <Button
              className="rounded-md !bg-white drop-shadow"
              onClick={() => onUserClick?.(id, 'Nathaniel Brooks')}
              size="icon"
            >
              <CircleUserRound className="size-4 text-[#4579F9]" />
            </Button>
          )}
        </div>
      );
    },
  },
];

export const createIncomingTableData = (
  onPendingRowClick?: () => void,
  onApprovedRowClick?: () => void,
  onOpen?: () => void
): ColumnDef<IncomingTableDataType>[] => [
  {
    accessorKey: 'referral_from',
    header: 'Referral From',
    cell: ({ row }) => {
      const fromAddress = row.original.referral_from_address
      const referral = row.original.referral_from

      return (
        <div className="flex items-center space-x-2">
          <HospitalIcon />
          <div className="flex flex-col items-start space-y-[2px] text-start">
            <p className="text-xs font-semibold">{referral}</p>
            <p className="truncate text-[10px] font-normal">{fromAddress}</p>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'referral_to',
    header: 'Referral To',
    cell: ({ row }) => {
      const toAddress = row.original.referral_to_address
      const referral = row.original.referral_to

      return (
        <div className="flex items-center space-x-2">
          <HospitalIcon />
          <div className="flex flex-col items-start space-y-[2px] text-start">
            <p className="text-xs font-semibold">{referral}</p>
            <p className="truncate text-[10px] font-normal">{toAddress}</p>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusIncomingBadge status={row.original.status}/>;
    }
  },
  {
    accessorKey: "speciality",
    header: "Speciality"
  },
  {
    accessorKey: "assign_to",
    header: "Assign to",
    cell: ({ row }) => {
      const assign = row.getValue("assign_to");
      return assign === "" ? "Unassigned" : assign;
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const created = new Date(row.getValue("created"));
      return `${formatDate(created)} Days Ago`;
    },
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <div className="flex gap-2">
          <Button
            className="rounded-md !bg-white drop-shadow"
            onClick={() => {
              if (status === 'new') {
                onOpen?.()
              } else if (status === 'pending') {
                onPendingRowClick?.()
              } else if (status === 'approved') {
                onApprovedRowClick?.()
              }
            }}
            size="icon"
          >
            <Eye className="size-4 text-[#4579F9]" />
          </Button>
        </div>
      );
    },
  },
]