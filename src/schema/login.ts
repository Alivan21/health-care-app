import { z } from "zod";

export const UserLoginSchema = z.object({
  email: z.string().email().min(1, { message: "The field is required" }),
  password: z.string().min(1, { message: "The field is required" }),
});

export type UserLoginSchemaType = z.infer<typeof UserLoginSchema>;
