import * as z from "zod";
import { strongPWOptions, confirmPWOptions  } from "./common/strongPWOptions";

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const ForgotPWValidation = (hasResetToken: boolean) => {
  const baseSchema = {
    email: z.string().email(),
    resetToken: z.string(),
    newPassword: z.string(),
    newPWConfirm: z.string(),
  };

  if (hasResetToken) {
    return z.object({
      ...baseSchema,
      resetToken: z.string().refine((data) => data.trim() !== "", {
        message: "Reset token is required.",
      }),
      newPassword: strongPWOptions,
      newPWConfirm: confirmPWOptions,
    }).refine((data) => data.newPassword === data.newPWConfirm, {
      message: "New passwords don't match",
      path: ["newPWConfirm"],
    });
  }

  return z.object(baseSchema);
};
