import { DoctorPriorityTypes } from "./referral";

export type PatientTypes = {
  id: string;
  name: string;
  gender: string;
  birthdate: Date;
  phone_number: string;
  policy_number: string;
  inscurance_provider: string;
  documents_history?: PatientDocumentTypes[];
};

export type PatientDocumentTypes = {
  document_name: string;
  document_url: string;
};

export type PatientTableTypes = {
  date: string;
  reason: string;
  referralFrom: string;
  referralTo: string;
  specialty: string;
  startDate: string;
  endDate: string;
  priority: DoctorPriorityTypes;
};
