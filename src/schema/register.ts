import { z } from "zod";

export const UserRegisterSchema = z
  .object({
    username: z.string().min(1, { message: "The field is required" }),
    first_name: z.string().min(1, { message: "The field is required" }),
    last_name: z.string().min(1, { message: "The field is required" }),
    email: z.string().email().min(1, { message: "The field is required" }),
    phone_number: z.string().min(1, { message: "The field is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirm_password: z.string().min(1, { message: "The field is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type UserRegisterSchemaType = z.infer<typeof UserRegisterSchema>;
