import {
  OrganizationAndPayerSection,
  PatientInformationSection,
  RequestingProviderSection,
  ServiceInformationSection,
} from "@/components/drawer/referral";
import TabsSection from "@/components/drawer/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ReviewSection() {
  return (
    <>
      <ScrollArea className="mx-auto w-full max-w-3xl space-y-6 px-4">
        <Accordion
          className="w-full space-y-2"
          defaultValue={["patient", "organization", "provider", "service"]}
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
          <AccordionItem value="service">
            <AccordionTrigger>
              <span className="flex items-center gap-2">Service Information</span>
            </AccordionTrigger>
            <AccordionContent>
              <ServiceInformationSection />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
      <TabsSection />
    </>
  );
}
