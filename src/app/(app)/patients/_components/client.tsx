"use client";

import MainContainer from "@/components/layouts/main-container";
import PatientList from "./patient-list";

export default function PatientClient() {
  return (
    <MainContainer className="flex bg-[#FAFAFA] !p-4">
      <PatientList />
    </MainContainer>
  );
}
