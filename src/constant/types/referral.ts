export interface MedicalCardTypes {
  id: string;
  priority: DoctorPriorityTypes;
  name: string;
  patient_name: string;
  speciality: string;
  assign_to?: string;
  created_at: Date;
}

export type DoctorPriorityTypes = "STAT" | "Urgent" | "Routine" | "SUCCESS";
