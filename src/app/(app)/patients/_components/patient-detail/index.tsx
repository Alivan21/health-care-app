import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientMockData, PatientTableMockData } from "@/constant/mock/patient-data";
import { PatientTypes } from "@/constant/types/patient";
import {
  MessageCircleMore,
  PhoneForwarded,
  PhoneOutgoing,
  Siren,
  GitFork,
  Check,
  FileText,
  Eye,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatusBadge from "@/components/badge/status-badge";
import DocumentDialog from "../document-dialog";
import BasicInformation from "@/components/basic-information";

type PatientDetailProps = {
  id: string;
};

const appointments = [
  {
    date: "16 November 2024",
    description: "Lorem ipsum dolor sit amet",
  },
  {
    date: "16 November 2024",
    description: "Lorem ipsum dolor sit amet",
  },
  {
    date: "16 November 2024",
    description: "Lorem ipsum dolor sit amet",
  },
  {
    date: "16 November 2024",
    description: "Lorem ipsum dolor sit amet",
  },
  {
    date: "16 November 2024",
    description: "Lorem ipsum dolor sit amet",
  },
  {
    date: "16 November 2024",
    description: "Lorem ipsum dolor sit amet",
  },
];

export default function PatientDetail({ id }: PatientDetailProps) {
  const [patientData, setPatientData] = useState<PatientTypes | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState<string | null>(null);

  useEffect(() => {
    const patient = PatientMockData.find(data => data.id === id);
    if (patient) {
      setPatientData(patient);
    }
  }, [id]);

  const handleDocumentClick = (url: string) => {
    setSelectedDocumentUrl(url);
    setDialogOpen(true);
  };

  if (!patientData) {
    return (
      <section className="flex flex-col rounded-lg border border-border bg-white px-5 py-6">
        No Patient Data Selected
      </section>
    );
  }

  return (
    <>
      {!!dialogOpen && !!selectedDocumentUrl && (
        <DocumentDialog onClose={() => setDialogOpen(false)} url={selectedDocumentUrl} />
      )}
      <ScrollArea className="relative flex flex-col overflow-auto rounded-lg border border-border bg-white px-5 py-6">
        {/* Upper Section */}
        <div className="mb-8 flex items-end justify-between">
          {/* Avatar Profile Section */}
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage alt="User Profile" className="size-12" src="/img/user-profile-1.svg" />
              <AvatarFallback>Up</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-start">
              <p className="text-xl font-medium">{patientData.name}</p>
              <div className="mt-1 flex items-center space-x-5">
                <p className="text-sm font-medium">{patientData.id}</p>
                <p className="text-sm font-normal">22/09/2024</p>
              </div>
            </div>
          </div>

          {/* Button Section */}
          <div className="flex items-center space-x-2">
            <Button size="icon" variant="outline">
              <MessageCircleMore />
            </Button>
            <Button size="icon" variant="outline">
              <PhoneOutgoing />
            </Button>
          </div>
        </div>

        {/* Detail Card Information */}
        <div className="mb-4 grid grid-cols-3 gap-3">
          {/* Basic Information Card */}
          <Card className="px-4 pb-3 pt-5">
            <CardHeader className="!p-0">
              <CardTitle className="!text-base">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="mt-8 !p-0">
              <BasicInformation
                data={String(patientData.gender)}
                icon={<Image alt="gender icon" height={12} src="/img/gender.svg" width={12} />}
                placeholder="Gender"
                wrapperClassName="mb-6"
              />
              <BasicInformation
                data={String(
                  patientData.birthdate ? patientData.birthdate.toISOString() : "12 August 2001"
                )}
                icon={<Image alt="gender icon" height={12} src="/img/gender.svg" width={12} />}
                placeholder="Birthday"
                wrapperClassName="mb-6"
              />
              <BasicInformation
                data={String(patientData.phone_number)}
                icon={<PhoneForwarded className="size-3 text-[#1757F7]" />}
                placeholder="Mobile Number"
                wrapperClassName="mb-6"
              />
              <BasicInformation
                data={String(patientData.policy_number)}
                icon={<Siren className="size-3 text-[#1757F7]" />}
                placeholder="Policy Number"
                wrapperClassName="mb-6"
              />
              <BasicInformation
                data={String(patientData.inscurance_provider)}
                icon={<GitFork className="size-3 text-[#1757F7]" />}
                placeholder="Insurance Provider"
              />
            </CardContent>
          </Card>

          {/* Appointment Schedule Card */}
          <Card className="px-4 pb-3 pt-5">
            <CardHeader className="!p-0">
              <CardTitle className="!text-base">Appointment Schedule</CardTitle>
            </CardHeader>
            <CardContent className="!relative mt-8 !p-0">
              <div className="relative">
                <div className="space-y-8">
                  {appointments.map((appointment, index) => (
                    <div className="relative flex items-center gap-2" key={index}>
                      <div className="relative z-10">
                        <div className="flex size-4 items-center justify-center rounded-full border-[0.5px] border-[#BCE5CF] bg-green-50">
                          <Check className="size-2 text-green-500" />
                        </div>
                      </div>
                      <div className="flex flex-col pt-1">
                        <span className="text-[10px] text-gray-500">{appointment.date}</span>
                        <span className="text-xs font-semibold">{appointment.description}</span>
                      </div>
                      {index !== appointments.length - 1 && (
                        <div className="absolute left-[7px] top-9 h-[30px] w-[2px] bg-gray-100" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Assurance & Documents Section */}
          <div className="flex flex-col space-y-3">
            <Card className="bg-patient-card-gradient p-4 text-white">
              <h3 className="text-sm font-semibold">Data of Assurance</h3>
              <p className="my-6 text-lg font-semibold">8763 2736 9873 0329</p>
              <div className="flex space-x-8">
                <div className="flex flex-col space-y-[2px]">
                  <p className="text-[10px] font-normal">Status</p>
                  <p className="text-xs font-bold">Active</p>
                </div>
                <div className="flex flex-col space-y-[2px]">
                  <p className="text-[10px] font-normal">Expired Date</p>
                  <p className="text-xs font-bold">10/28</p>
                </div>
              </div>
            </Card>
            <Card className="h-full px-4 pb-3 pt-5">
              <CardHeader className="!p-0">
                <CardTitle className="mb-4 !text-base">Agreement Document</CardTitle>
              </CardHeader>
              <CardContent className="!p-0">
                {patientData.documents_history ? (
                  patientData.documents_history.map((data, index) => (
                    <div
                      className="mb-2 flex items-center justify-between rounded-md border border-[#B7CBFD] px-3 py-2"
                      key={index}
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="text-[#4579F9]" />
                        <div className="flex flex-col items-start text-start">
                          <p className="text-xs font-semibold">{data.document_name}</p>
                          <p className="text-[10px] font-normal">500 Kb</p>
                        </div>
                      </div>
                      <Button
                        className="rounded-md border border-border !bg-white drop-shadow-sm"
                        onClick={() => handleDocumentClick(data.document_url)}
                        size="icon"
                      >
                        <Eye className="text-[#4579F9]" size={16} />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div>No Document Found</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Patient History Table */}
        <div className="flex flex-col rounded-xl border border-border p-3">
          {/* Upper Section */}
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold">History</h2>
            <Select defaultValue="3months">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader className="!mb-9">
                <TableRow className="!bg-[#F8FAFB]">
                  <TableHead>Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Referral From</TableHead>
                  <TableHead>Referral To</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PatientTableMockData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.reason}</TableCell>
                    <TableCell>{row.referralFrom}</TableCell>
                    <TableCell>{row.referralTo}</TableCell>
                    <TableCell>{row.specialty}</TableCell>
                    <TableCell>{row.startDate}</TableCell>
                    <TableCell>{row.endDate}</TableCell>
                    <TableCell>
                      <StatusBadge status={row.priority} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
