import { z } from "zod";

export const UserAssignemtSchema = z.object({
  organization_name: z.string().min(1, { message: "The field is required" }),
  organization_type: z.string().min(1, { message: "The field is required" }),
  organization_npi: z.string().min(1, { message: "The field is required" }),
  organization_taxonomy: z.string().min(1, { message: "The field is required" }),
  payers_region: z.string().min(1, { message: "The field is required" }),
  organization_address: z.string().min(1, { message: "The field is required" }),
  organization_suite: z.string().optional(),
  organization_zipcode: z.string().min(1, { message: "The field is required" }),
  organization_city: z.string().min(1, { message: "The field is required" }),
  organization_state: z.string().min(1, { message: "The field is required" }),
  organization_phone: z.string().min(1, { message: "The field is required" }),
  organization_member: z.array(
    z.object({
      member_email: z.string().email().min(1, { message: "The field is required" }),
      member_role: z.string().min(1, { message: "The field is required" }),
    })
  )
})

export type UserAssignmentSchemaType = z.infer<typeof UserAssignemtSchema>;