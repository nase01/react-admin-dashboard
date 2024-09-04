import * as z from "zod";
import { strongPWOptions, confirmPWOptions  } from "./common/strongPWOptions";

export const AccountValidation = z.object({
  password: z.string().refine((data) => data.trim() !== "", {
    message: "Current password is required."
  }),
  newPassword: strongPWOptions.optional(),
  newPasswordConfirm: confirmPWOptions.optional()
}).refine((data) => data.newPassword === data.newPasswordConfirm, {
  message: "New passwords don't match",
  path: ["newPasswordConfirm"]
});