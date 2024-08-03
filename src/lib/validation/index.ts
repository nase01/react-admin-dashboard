import * as z from "zod";

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const ForgotPasswordValidation = z.object({
  email: z.string().email()
});
