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
};

export type IncomingTableDataType = {
  referral_from: string;
  referral_from_address: string;
  referral_to: string;
  referral_to_address: string;
  status: "new" | "pending" | "approved" | "completed" | "denied";
  speciality: string;
  assign_to?: string;
  created: Date;
}