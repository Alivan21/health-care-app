import { z } from "zod";

export const UserCaptchaMockup = z.object({
  captcha: z
    .string()
    .min(1, { message: "The field is required" })
    .regex(/^Td4eVa$/, { message: "Captcha is incorrect" }),
});

export type UserCaptchaMockupType = z.infer<typeof UserCaptchaMockup>;
