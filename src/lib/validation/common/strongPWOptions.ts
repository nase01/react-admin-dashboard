import * as z from "zod";

export const strongPWOptions = z.string().min(8, { message: "Must be at least 8 characters." });
export const confirmPWOptions = z.string().refine((data) => data.trim() !== "", {
    message: "Confirmation is required."
})