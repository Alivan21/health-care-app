import { z } from "zod";

export const DocumentParseSchema = z.object({
  organization: z.object({
    name: z.string().min(1, { message: "This field is required" }),
    speciality: z.string().min(1, { message: "This field is required" }),
    address: z.string().min(1, { message: "This field is required" }),
    npi_code: z.string().length(10, { message: "NPI must be exactly 10 characters long" }),
    phone: z.string().min(1, { message: "This field is required" }),
    fax: z.string().optional(),
    email: z.string().email().min(1, { message: "This field is required" }),
  }),
  summary: z.string().optional(),
  patient_info: z.object({
    full_name: z.string().min(1, { message: "This field is required" }),
    date_of_birth: z.date(),
    member_id: z.string().optional(),
  }),
  insurance_info: z.object({
    insurance: z.string().min(1, { message: "This field is required" }),
    request_type: z.string().min(1, { message: "This field is required" }),
    relation_to_subscribe: z.string().min(1, { message: "This field is required" }),
  }),
  specialist: z.object({
    provider_name: z.string().min(1, { message: "This field is required" }),
    speciality: z.string().min(1, { message: "This field is required" }),
    npi_code: z.string().length(10, { message: "NPI must be exactly 10 characters long" }),
  }),
  generalist: z.object({
    provider_name: z.string().min(1, { message: "This field is required" }),
    speciality: z.string().min(1, { message: "This field is required" }),
    npi_code: z.string().length(10, { message: "NPI must be exactly 10 characters long" }),
  }),
  diagnosis: z.array(
    z.object({
      icdCode: z.string().min(1, "ICD Code is required"),
      description: z.string().min(1, "Description is required"),
    })
  ),
  procedures: z.array(
    z.object({
      cptCode: z.string().min(1, "CPT Code is required"),
      description: z.string().min(1, "Description is required"),
      type: z.string().min(1, "Type is required"),
      fromDate: z.date(),
      toDate: z.date(),
      qty: z.string().min(1, "Quantity is required"),
      qtyType: z.string().min(1, "Quantity type is required"),
    })
  ),
  serviceInfo: z.object({
    placeOfService: z.string().min(1, "Place of service is required"),
    serviceType: z.string().min(1, "Type is required"),
    fromDate: z.date(),
    toDate: z.date(),
    qty: z.string().min(1, "Quantity is required"),
    qtyType: z.string().min(1, "Quantity type is required"),
  }),
  visitDetails: z.object({
    numberOfVisits: z.string().min(1, "Number of visits is required"),
    appointmentDate: z.date(),
  }),
});

export type DocumentParseSchemaType = z.infer<typeof DocumentParseSchema>;
