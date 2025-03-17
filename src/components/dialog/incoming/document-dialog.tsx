import { DatePicker } from "@/components/date-picker";
import CustomInput from "@/components/input/custom-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import type { ProcedureCode } from "@/constant/types/referral";
import { WandSparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

interface Props {
  open?: boolean;
  onClose?: (open?: boolean) => void;
  buttonDialog?: React.ReactNode;
  isParsed?: boolean;
  setIsParsed?: (isParsed: boolean) => void;
  setReferral?: (value: boolean) => void;
}

export const items = [
  {
    title: "Organization & Payer",
    content: <OrganizationPayerSection />,
  },
  {
    title: "Summary",
    content: <SummarySection />,
  },
  {
    title: "Patient Information",
    content: <PatientInformationSection />,
  },
  {
    title: "Insurance Information",
    content: <PatientInformationSection />,
  },
  {
    title: "Requesting Provider",
    content: "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

export default function IncomingDocumentDialog({ open, onClose, buttonDialog }: Props) {
  const router = useRouter();

  const handleDetailParse = () => {
    router.push("/referrals/incoming");
  };

  return (
    <Dialog onOpenChange={onClose} open={open}>
      {!!buttonDialog && <DialogTrigger asChild>buttonDialog</DialogTrigger>}
      <DialogContent className="h-screen w-full max-w-full overflow-y-auto p-0 sm:max-w-[95vw] md:max-w-[90vw]">
        <div className="flex h-full flex-col p-4">
          <DialogHeader>
            <DialogTitle>Document1.pdf</DialogTitle>
          </DialogHeader>
          <div className="flex size-full space-x-6 p-5">
            <div className="flex w-full flex-col">
              <div className="size-full">
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
                <Button onClick={handleDetailParse}>
                  <WandSparkles /> Parsing Fax
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function PatientInformationSection() {
  const [date, setDate] = useState<Date>();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="!pr-0 !font-normal">Patient Name</TableHead>
          <TableHead className="!pr-0 !font-normal">Member ID</TableHead>
          <TableHead className="!pr-0 !font-normal">Date of Birth</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="!p-2">
            <CustomInput
              inputClassName="!text-xs"
              inputProps={{
                defaultValue: "Emily Watkins",
              }}
              placeholder="Patient Name"
            />
          </TableCell>
          <TableCell className="!p-2">
            <CustomInput
              inputClassName="!text-xs"
              inputProps={{
                defaultValue: "Emily Watkins",
              }}
              placeholder="Patient Name"
            />
          </TableCell>
          <TableCell className="!p-2">
            <DatePicker onSelect={setDate} selected={date} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function InsuranceInfoSection() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="!pr-0 !font-normal">Insurance</TableHead>
          <TableHead className="!pr-0 !font-normal">Request Type</TableHead>
          <TableHead className="!pr-0 !font-normal">Relation to Subscriber</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {Array.from({ length: 3 }).map((_, index) => (
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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="!pr-0 !font-normal">Organization Name</TableHead>
          <TableHead className="!pr-0 !font-normal">Address</TableHead>
          <TableHead className="!pr-0 !font-normal">Phone</TableHead>
          <TableHead className="!pr-0 !font-normal">Fax</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {Array.from({ length: 4 }).map((_, index) => (
            <TableCell className="!p-2" key={index}>
              <CustomInput
                inputClassName="!text-xs"
                inputProps={{
                  defaultValue: "",
                }}
                placeholder="Organization input field"
              />
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
      <TableHeader>
        <TableRow>
          <TableHead className="!pr-0 !font-normal">Speciality</TableHead>
          <TableHead className="!pr-0 !font-normal">NPI</TableHead>
          <TableHead className="!pr-0 !font-normal">Tax ID</TableHead>
          <TableHead className="!pr-0 !font-normal">Contact Info</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {Array.from({ length: 4 }).map((_, index) => (
            <TableCell className="!p-2" key={index}>
              <CustomInput
                inputClassName="!text-xs"
                inputProps={{
                  defaultValue: "",
                }}
                placeholder="Organization input field"
              />
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function SummarySection() {
  const [message, setMessage] = useState<string>();

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
    setMessage(e.target.value);
  };

  return (
    <div className="grid w-full gap-2">
      <Label htmlFor="message">Your Sumarry</Label>
      <Textarea
        id="message"
        onChange={handleChange}
        placeholder="Type your message here."
        value={message}
      />
    </div>
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
