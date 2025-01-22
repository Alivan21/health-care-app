import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WandSparkles, X, AlignVerticalSpaceBetween, CopySlash, PencilLine } from "lucide-react";
import type React from "react";
import { useState } from "react";
import CustomInput from "@/components/input/custom-input";
import type { ProcedureCode } from "@/constant/types/referral";
import { ProcedureCodeSection } from "@/components/drawer/referral";

interface Props {
  open?: boolean;
  onClose?: (open?: boolean) => void;
  buttonDialog?: React.ReactNode;
  isParsed?: boolean;
  setIsParsed?: (isParsed: boolean) => void;
  setReferral?: (value: boolean) => void;
}

export default function IncomingDocumentDialog({
  open,
  onClose,
  buttonDialog,
  isParsed,
  setIsParsed,
  setReferral,
}: Props) {
  return (
    <Dialog onOpenChange={onClose} open={open}>
      {!!buttonDialog && <DialogTrigger asChild>buttonDialog</DialogTrigger>}
      <DialogContent className="w-full !max-w-[1150px]">
        <DialogHeader>
          <DialogTitle>Document1.pdf</DialogTitle>
        </DialogHeader>
        <div className="flex w-full space-x-6 p-5">
          <div className="flex w-full flex-col">
            <div className="h-[500px] w-full">
              <iframe
                className="size-full border-0"
                src="/documents/mock-patient-document.pdf"
                title="Document Viewer"
              />
            </div>
            <div className="mt-8 flex items-center space-x-2 self-end">
              <Button className="!hover:bg-white !border border-border !bg-white !text-muted-foreground">
                Download
              </Button>
              <Button onClick={() => setIsParsed?.(true)}>
                <WandSparkles /> Parsing Fax
              </Button>
            </div>
          </div>
          <div className={`${isParsed ? "flex" : "hidden"} w-full flex-col`}>
            <div className="flex size-full max-h-[496px] flex-col items-start overflow-y-auto rounded-lg border border-border p-4">
              <div className="mb-8 flex flex-col space-y-2">
                <p className="text-base font-semibold">Parsed Data</p>
                <p className="text-sm font-normal text-[#878787]">Lorem ipsum dolor sir amet</p>
              </div>
              <div className="mb-5 flex flex-col items-start space-y-2">
                <p className="text-sm">Patient Information</p>
                <PatientInformationSection />
              </div>
              <div className="mb-5 flex w-full flex-col items-start space-y-2">
                <p className="text-sm">Organization & Payer</p>
                <OrganizationPayerSection />
              </div>
              <div className="mb-5 flex w-full flex-col items-start space-y-2">
                <p className="text-sm">Requesting Provider</p>
                <RequestingProviderSection />
              </div>
              <div className="flex w-full flex-col items-start space-y-2">
                <p className="text-sm">Procedure Code</p>
                <ProcedureCodeSection />
              </div>
            </div>
            <div className="mt-8 flex items-center space-x-2 self-end">
              <Button className="!hover:bg-white !border border-border !bg-white !text-muted-foreground">
                Retry Parsing <AlignVerticalSpaceBetween />
              </Button>
              <Button className="!hover:bg-white !border border-border !bg-white !text-muted-foreground">
                Auto Match <CopySlash />
              </Button>
              <Button
                onClick={e => {
                  e.stopPropagation();
                  setReferral?.(true);
                  onClose?.(false);
                }}
              >
                Add Referral <PencilLine />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function PatientInformationSection() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="!pr-0 !font-normal">Patient Name</TableHead>
          <TableHead className="!pr-0 !font-normal">Member ID</TableHead>
          <TableHead className="!pr-0 !font-normal">Date of Birth</TableHead>
          <TableHead className="!pr-0 !font-normal">Gender</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {Array.from({ length: 4 }).map((_, index) => (
            <TableCell className="!p-2" key={index}>
              <CustomInput
                inputClassName="!text-xs"
                inputProps={{
                  defaultValue: "Emily Watkins",
                }}
                placeholder="Patient Name"
              />
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function OrganizationPayerSection() {
  const [provider, setProvider] = useState("provider1");

  const providerOptions = [
    { label: "Outpatient Authorization", value: "provider1" },
    { label: "Outpatient Authorization", value: "provider2" },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="!pr-0 !font-normal">Payer</TableHead>
          <TableHead className="!pr-0 !font-normal">Provider Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <CustomInput
              inputClassName="!text-xs"
              inputProps={{
                defaultValue: "Emily Watkins",
              }}
              placeholder="Patient Name"
            />
          </TableCell>
          <TableCell>
            <Select defaultValue="provider1" onValueChange={setProvider} value={provider}>
              <SelectTrigger className="w-full" variant="default">
                <SelectValue className="!text-muted-foreground" placeholder="Provider Role" />
              </SelectTrigger>
              <SelectContent className="!w-full">
                {providerOptions.map((data, index) => (
                  <SelectItem key={index} value={data.value}>
                    {data.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function RequestingProviderSection() {
  const [provider, setProvider] = useState("provider1");
  const [specialityCode, setSpecialityCode] = useState("value1");

  const providerOptions = [
    { label: "Outpatient Authorization", value: "provider1" },
    { label: "Outpatient Authorization", value: "provider2" },
  ];

  const specialityCodeOptions = [
    { label: "20700000X0", value: "value1" },
    { label: "20700000X0", value: "value2" },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="!pr-0 !font-normal">Speciality</TableHead>
          <TableHead className="!pr-0 !font-normal">Provider Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Select onValueChange={setSpecialityCode} value={specialityCode}>
              <SelectTrigger className="w-full" variant="default">
                <SelectValue className="!text-muted-foreground" placeholder="Speciality" />
              </SelectTrigger>
              <SelectContent className="!w-full">
                <SelectGroup>
                  {specialityCodeOptions.map((data, index) => (
                    <SelectItem key={index} value={data.value}>
                      {data.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell>
            <Select onValueChange={setProvider} value={provider}>
              <SelectTrigger className="w-full" variant="default">
                <SelectValue className="!text-muted-foreground" placeholder="Provider Role" />
              </SelectTrigger>
              <SelectContent className="!w-full">
                <SelectGroup>
                  {providerOptions.map((data, index) => (
                    <SelectItem key={index} value={data.value}>
                      {data.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function ProcedureCode() {
  const availableCodes: ProcedureCode[] = [
    {
      code: "99204",
      description: "New Patient, Moderate Complexity Visit",
      quantity: 1,
      dateRange: {
        from: new Date(2024, 11, 5),
        to: new Date(2025, 2, 5),
      },
    },
    {
      code: "99214",
      description: "Established Patient, Moderate Complexity Visit",
      quantity: 1,
      dateRange: {
        from: new Date(2024, 11, 5),
        to: new Date(2025, 2, 5),
      },
    },
    {
      code: "99202",
      description: "New Patient, Straightforward Visit",
      quantity: 1,
      dateRange: {
        from: new Date(2024, 11, 5),
        to: new Date(2025, 2, 5),
      },
    },
    {
      code: "99205",
      description: "New Patient, High Complexity Visit",
      quantity: 1,
      dateRange: {
        from: new Date(2024, 11, 5),
        to: new Date(2025, 2, 5),
      },
    },
    {
      code: "99211",
      description: "Established Patient, Minimal Visit",
      quantity: 1,
      dateRange: {
        from: new Date(2024, 11, 5),
        to: new Date(2025, 2, 5),
      },
    },
  ];

  return availableCodes.length > 0 ? (
    availableCodes.map(code => (
      <button
        className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1"
        key={code.code}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <span className="text-sm">
          {code.code}: {code.description}
        </span>
        <Button
          className="size-5 p-0 hover:bg-gray-200"
          onClick={e => {
            e.stopPropagation();
          }}
          size="sm"
          variant="ghost"
        >
          <X className="size-3" />
        </Button>
      </button>
    ))
  ) : (
    <span>Select Procedure Code</span>
  );
}
