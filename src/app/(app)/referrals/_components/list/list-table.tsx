"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, CircleUserRound } from "lucide-react";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DoctorPriorityTypes, MedicalCardTypes } from "@/constant/types/referral";
import { formatDate } from "@/lib/utils";
import StatusBadge from "@/components/badge/status-badge";

export function AppointmentsTable({ data = [], onCardClick, onUserClick }: { data: MedicalCardTypes[]; onCardClick?: (cardData: MedicalCardTypes) => void; onUserClick?: (id: string, newAssignTo: string) => void}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<MedicalCardTypes>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          aria-label="Select all"
          checked={
            table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
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
                  .map(n => n[0])
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
      header: "Patient Name"
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const status = row.getValue("priority") as DoctorPriorityTypes
        return (
          <StatusBadge status={status}/>
        );
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
        const assign = row.getValue("assign_to")
        if (assign === '') {
          return 'None'
        }

        return assign
      }
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => {
        const created = new Date(row.getValue("created_at"));
        return `${formatDate(created)} Days Ago`
      },
    },
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        const assign = row.getValue("assign_to")
        const id = row.original.id
        return (
          <div className="flex gap-2">
            <Button size="icon" className="drop-shadow !bg-white rounded-md" 
              onClick={() => {
                onCardClick?.(row.original)
              }}>
              <Eye className="size-4 text-[#4579F9]" />
            </Button>
            {assign !== '' ? (
              <Button size="icon" variant="link">
                <Avatar className="size-8">
                  <AvatarImage src="/img/user-profile-1.svg" />
                  <AvatarFallback>NB</AvatarFallback>
                </Avatar>
              </Button>
            ) : (
              <Button size="icon" className="drop-shadow !bg-white rounded-md" onClick={() => onUserClick?.(id, 'Ronald Grover')}>
                <CircleUserRound className="size-4 text-[#4579F9]"/>
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <div className="w-full bg-white p-3">
      <div className="py-1">{/* Table controls can be added here if needed */}</div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="!bg-[#F8FAFB]">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow data-state={row.getIsSelected() && "selected"} key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="h-24 text-center" colSpan={columns.length}>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
