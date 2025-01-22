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
import { DoctorPriorityTypes, MedicalCardTypes } from "@/constant/types/referral";
import { Ban, CheckCheck, User2 } from "lucide-react";
import StatusBadge from "../badge/status-badge";
import { ScrollArea } from "../ui/scroll-area";
import TabsSection from "./tabs";
import {
  OrganizationAndPayerSection,
  PatientInformationSection,
  ProcedureCodeSection,
  RenderingProviderSection,
  RequestingProviderSection,
  ServiceInformationSection,
} from "./referral";

interface Props {
  props: MedicalCardTypes;
  open: boolean;
  onClose: () => void;
  onClickApproval?: () => void;
  isAssigned?: boolean;
  isDenied?: boolean;
  isApproved?: boolean;
}

export default function IncomingReferralDrawer({
  props,
  open,
  onClose,
  onClickApproval,
  isAssigned,
  isDenied,
  isApproved,
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
            <div className="flex items-center gap-4">{statusBadge(props.priority)}</div>
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
          <TabsSection isIncoming status={props.status || ""} />
        </ScrollArea>
        <div className="border-t px-6 py-3">
          {isDenied ? (
            <div className="mx-auto flex items-center justify-center gap-2 text-destructive">
              <Ban />
              <span>Denied 1 hour ago</span>
            </div>
          ) : (
            <div className="flex justify-center gap-4">
              {isApproved ? (
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCheck />
                  {props.status === "completed" ? (
                    <span>Completed 1 hour ago</span>
                  ) : (
                    <span>Submitted 1 hour ago</span>
                  )}
                </div>
              ) : (
                <Button className="flex-1" onClick={onClickApproval}>
                  Request Approval
                </Button>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
