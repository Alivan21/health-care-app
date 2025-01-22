import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DoctorPriorityTypes, MedicalCardTypes, ProcedureCode } from "@/constant/types/referral";
import {
  Ban,
  Building2,
  Calendar,
  CheckCheck,
  ClipboardList,
  Link,
  Stethoscope,
  User2,
  UserCog,
  Users2,
  Wallet,
  X,
} from "lucide-react";
import StatusBadge from "../badge/status-badge";
import { ScrollArea } from "../ui/scroll-area";
import TabsSection from "./tabs";
import { Label } from "../ui/label";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface Props {
  props: MedicalCardTypes;
  open: boolean;
  onClose: () => void;
  onClickApproval?: () => void;
  isAssigned?: boolean;
  isDenied?: boolean;
  isApproved?: boolean;
  isDraft?: boolean;
}

export default function ReferralDrawer({
  props,
  open,
  onClose,
  onClickApproval,
  isAssigned,
  isDenied,
  isApproved,
  isDraft,
}: Props) {
  const statusBadge = (priority: DoctorPriorityTypes) => {
    if (props.status === "approved") {
      return <StatusBadge status="SUCCESS" text="Approved" />;
    }

    if (props.status === "new") {
      return <StatusBadge status={priority} text="New" />;
    }

    if (props.status === "pending") {
      return <StatusBadge status="Urgent" text="Pending" />;
    }

    if (props.status === "denied") {
      return <StatusBadge status="STAT" text="Denied" />;
    }

    return <StatusBadge status="SUCCESS" text="Completed" />;
  };

  return (
    <Sheet onOpenChange={onClose} open={open}>
      <SheetContent className="flex w-full !max-w-lg flex-col rounded-l-lg p-0">
        <SheetHeader className="border-b p-6">
          <SheetTitle className="sr-only">Referral Request Details</SheetTitle>
          <SheetDescription className="sr-only">Referral Request Details Sheet</SheetDescription>
        </SheetHeader>
        <div className="space-y-5 border-b px-6 pb-3">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <StatusBadge status={props.priority} />
              {statusBadge(props.priority)}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Request ID: {props.id}</span>
              <span className="text-sm text-muted-foreground">Due Date: 09/01/2024</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Referral Request Details</h2>
            {isAssigned ? (
              <Button size="icon" variant="link">
                <Avatar className="size-8">
                  <AvatarImage src="/img/user-profile-1.svg" />
                  <AvatarFallback>NB</AvatarFallback>
                </Avatar>
              </Button>
            ) : (
              <Button className="size-7 rounded-full" size="icon" variant="primaryOutline">
                <User2 className="!size-5" />
              </Button>
            )}
          </div>
        </div>
        <ScrollArea className="h-full flex-1 px-6">
          <Accordion
            className="w-full space-y-2"
            defaultValue={[
              "patient",
              "organization",
              "provider",
              "service",
              "procedure-code",
              "rendering-provider",
            ]}
            type="multiple"
          >
            <AccordionItem value="patient">
              <AccordionTrigger className="!pt-0">
                <span className="flex items-center gap-2">Patient Information</span>
              </AccordionTrigger>
              <AccordionContent>
                <PatientInformationSection />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="organization">
              <AccordionTrigger>
                <span className="flex items-center gap-2">Organization & Payer</span>
              </AccordionTrigger>
              <AccordionContent>
                <OrganizationAndPayerSection />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="provider">
              <AccordionTrigger>
                <span className="flex items-center gap-2">Requesting Provider</span>
              </AccordionTrigger>
              <AccordionContent>
                <RequestingProviderSection />
              </AccordionContent>
            </AccordionItem>
            {props.status !== "new" && (
              <AccordionItem value="service">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">Service Information</span>
                </AccordionTrigger>
                <AccordionContent>
                  <ServiceInformationSection />
                </AccordionContent>
              </AccordionItem>
            )}
            {props.status !== "new" && props.status !== "pending" && (
              <AccordionItem value="procedure-code">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">Procedure Code</span>
                </AccordionTrigger>
                <AccordionContent>
                  <ProcedureCodeSection />
                </AccordionContent>
              </AccordionItem>
            )}
            {props.status !== "new" && props.status !== "pending" && (
              <AccordionItem value="rendering-provider">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">Rendering Provider</span>
                </AccordionTrigger>
                <AccordionContent>
                  <RenderingProviderSection />
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
          <TabsSection status={props.status || ""} />
        </ScrollArea>
        <div className="border-t px-6 py-3">
          {isDenied ? (
            <div className="mx-auto flex items-center justify-center gap-2 text-destructive">
              <Ban />
              <span>Denied 1 hour ago</span>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button className="flex-1" variant="outline">
                Schedule
              </Button>
              {isApproved ? (
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCheck />
                  {props.status === "approved" ? (
                    <span>Approved 1 hour ago</span>
                  ) : (
                    <span>Submitted 1 hour ago</span>
                  )}
                </div>
              ) : (
                <Button
                  className="flex-1 border border-[#4579F9] !bg-gradient-to-b from-[#3F76FF] to-[#1757F7]"
                  onClick={onClickApproval}
                >
                  {isDraft ? "Continue Approval Request" : "Request Approval"}
                </Button>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function PatientInformationSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <User2 className="size-5 text-muted-foreground" />
        <div className="flex flex-1 items-center justify-between">
          <span className="text-muted-foreground">Patient name</span>
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <div className="size-full rounded-full bg-primary" />
            </Avatar>
            <span>Emily Watkins</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <User2 className="size-5 text-muted-foreground" />
        <div className="flex flex-1 items-center justify-between">
          <span className="text-muted-foreground">Member ID</span>
          <span>H7A2274923714</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Calendar className="size-5 text-muted-foreground" />
        <div className="flex flex-1 items-center justify-between">
          <span className="text-muted-foreground">Date of birth</span>
          <span>10 December, 1946</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Users2 className="size-5 text-muted-foreground" />
        <div className="flex flex-1 items-center justify-between">
          <span className="text-muted-foreground">Gender</span>
          <span className="text-pink-500">Female</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link className="size-5 text-muted-foreground" />
        <div className="flex flex-1 items-center justify-between">
          <span className="text-muted-foreground">Subscriber Relation</span>
          <span>Relation: Self</span>
        </div>
      </div>
    </div>
  );
}

export function OrganizationAndPayerSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Building2 className="size-5 text-muted-foreground" />
        <div className="flex flex-1 items-center justify-between">
          <span className="text-muted-foreground">Organization</span>
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <div className="size-full rounded-full bg-blue-500" />
            </Avatar>
            <span>Lotus Clinic LLC</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Wallet className="size-5 text-muted-foreground" />
        <div className="flex flex-1 items-center justify-between">
          <span className="text-muted-foreground">Payer</span>
          <span>Humana</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <UserCog className="size-5 text-muted-foreground" />
        <div className="flex flex-1 items-center justify-between">
          <span className="text-muted-foreground">Provider Role</span>
          <span>Outpatient Authorization</span>
        </div>
      </div>
    </div>
  );
}

export function RequestingProviderSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <User2 className="size-5 text-muted-foreground" />
        <div className="flex flex-1 items-center justify-between">
          <span className="text-muted-foreground">Provider name</span>
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <div className="size-full rounded-full bg-gray-200" />
            </Avatar>
            <span>Dr. Anne Williams</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Stethoscope className="size-5 text-muted-foreground" />
        <div className="flex flex-1 items-center justify-between">
          <span className="text-muted-foreground">Speciality</span>
          <span>207D0000X</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <UserCog className="size-5 text-muted-foreground" />
        <div className="flex flex-1 items-center justify-between">
          <span className="text-muted-foreground">Provider Role</span>
          <span>Service Provider</span>
        </div>
      </div>
    </div>
  );
}

export function ServiceInformationSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Stethoscope className="size-5 text-muted-foreground" />
        <div className="flex flex-1 items-center justify-between">
          <span className="grow text-muted-foreground">Diagnosis Code</span>
          <ul className="max-w-52 space-y-1.5">
            <li className="text-right">5020 - Unspecified systolic (Congestive) heart failure</li>
            <li className="text-right">5021 - Acute systolic heart failure</li>
          </ul>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ClipboardList className="size-5 text-muted-foreground" />
        <div className="flex flex-1 items-center justify-between">
          <div className="text-muted-foreground">Service Type</div>
          <span>1 - Medical Care</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Calendar className="size-5 text-muted-foreground" />
        <div className="flex flex-1 items-center justify-between">
          <span className="text-muted-foreground">Date Range</span>
          <span className="text-primary">Select dates</span>
        </div>
      </div>
    </div>
  );
}

export function ProcedureCodeSection() {
  const selectedCodes: ProcedureCode[] = [
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
  ];

  return (
    <div className="space-y-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {selectedCodes.length > 0 ? (
            selectedCodes.map(code => (
              <button
                className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1"
                key={code.code}
              >
                <span className="text-sm">
                  {code.code}: {code.description}
                </span>
                <Button className="size-5 p-0 hover:bg-gray-200" size="sm" variant="ghost">
                  <X className="size-3" />
                </Button>
              </button>
            ))
          ) : (
            <span>Select Procedure Code</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function RenderingProviderSection() {
  return (
    <RadioGroup defaultValue="one">
      <Label className="flex cursor-pointer items-center space-x-4 rounded-lg border p-2 hover:bg-muted [&:has(:checked)]:bg-muted">
        <RadioGroupItem value="one" />
        <div className="grid flex-1 grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <Image
              alt="Rendering Pict"
              className="size-10 rounded-full bg-muted"
              height={24}
              src="/img/rendering_profile.svg"
              width={24}
            />
            <div>
              <div className="font-medium">Dr. James Harisson</div>
              <div className="text-sm text-muted-foreground">Cardiology</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-sm">Dec 05, 2024</div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-green-600">Insurance Accepted</span>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-sm">123 Main.St Miami, Florida, 33101</div>
            <div className="text-sm text-muted-foreground">3.6 mi</div>
          </div>
        </div>
      </Label>
    </RadioGroup>
  );
}
