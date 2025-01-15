import CustomInput from "@/components/input/custom-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import PatientListCard from "../ui/patient-list-card";
import PatientDetail from "../patient-detail";
import { PatientMockData } from "@/constant/mock/patient-data";
import { useState } from "react";

export default function PatientList() {
  const [id, setId] = useState("");

  return (
    <div className="flex w-full space-x-3">
      {/* List Section */}
      <ScrollArea className="w-[260px] shrink-0 rounded-lg border border-border bg-white">
        <section className="p-4 text-start">
          <p className="mb-3 text-base font-semibold">Patient List</p>
          <CustomInput
            icon={<Search className="size-4" />}
            inputWrapperClassName="mb-4"
            placeholder="Search patient"
            type="search"
          />
          <Tabs className="mb-3 rounded-lg border border-[#E8EEF3]">
            <TabsList className="grid w-full grid-cols-3 rounded-lg bg-white">
              <TabsTrigger className="drop-shadow" value="all">
                All
              </TabsTrigger>
              <TabsTrigger className="drop-shadow" value="oldest">
                Oldest
              </TabsTrigger>
              <TabsTrigger className="drop-shadow" value="newest">
                Newest
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <ScrollArea className="relative flex max-h-screen flex-col gap-4 overflow-auto rounded-lg bg-white">
            {PatientMockData.map(data => (
              <div className="mb-2" key={data.id}>
                <PatientListCard
                  onCardClick={() => setId(data.id)}
                  props={{ name: data.name, birthdate: data.birthdate, id: id }}
                />
              </div>
            ))}
          </ScrollArea>
        </section>
      </ScrollArea>

      {/* Detail Section */}
      <ScrollArea className="overflow-auto">
        <div className="grow">
          <PatientDetail id={id} />
        </div>
      </ScrollArea>
    </div>
  );
}
