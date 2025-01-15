"use client";

import { MedicalCardMockData } from "@/constant/mock/medical-card";
import ProviderCard from "./provider-card";
import MainContainer from "@/components/layouts/main-container";
import Filter from "./filter";
import { Separator } from "@/components/ui/separator";

export default function ProviderNetworkClient() {
  return (
    <MainContainer className="!px-0 !py-4">
      {/* Provider Headers */}
      <div className="flex items-center justify-between bg-white px-6 py-3">
        <div className="flex flex-col items-start space-y-1 text-start">
          <p className="text-xl font-semibold">Providers</p>
          <p className="text-base font-normal">Lorem ipsum dolor sit amet consectetur</p>
        </div>
        <Filter />
      </div>
      <Separator />
      {/* Provider Cards Section */}
      <div className="grid grid-cols-4 gap-3 px-6 pt-5">
        {MedicalCardMockData.map(data => (
          <ProviderCard
            experience={data.experience}
            key={data.id}
            name={data.name}
            practical_location={data.practical_location}
            speciality={data.speciality}
          />
        ))}
      </div>
    </MainContainer>
  );
}
