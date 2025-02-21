import { z } from "zod";

export const UserCaptchaMockup = z.object({
  captcha: z.string().min(1, { message: "The field is required" }),
});

export type UserCaptchaMockupType = z.infer<typeof UserCaptchaMockup>;
