import type { DateRange } from "react-day-picker";

export interface MedicalCardTypes {
  id: string;
  priority: DoctorPriorityTypes;
  name: string;
  patient_name: string;
  speciality: string;
  assign_to?: string;
  status?: string;
  practical_location: string;
  experience: string;
  isTop: boolean;
  created_at: Date;
}

export type DoctorPriorityTypes = "STAT" | "Urgent" | "Routine" | "SUCCESS";

export type ProcedureCode = {
  code: string;
  description: string;
  quantity: number;
  dateRange: DateRange;
  selected?: boolean;
}