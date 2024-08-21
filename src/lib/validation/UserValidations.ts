import * as z from "zod";
import { strongPWOptions, confirmPWOptions  } from "./common/strongPWOptions";

export const UserValidation = z.object({
  name: z.string().refine((data) => data.trim() !== "", {
    message: "Name is required."
  }),
  email: z.string().email(),
  password: strongPWOptions.optional(),
  passwordConfirm: confirmPWOptions.optional(),

  ipWhitelist: z.string().nullable().refine((data) => {
    if (data !== null && typeof data === "string" && data.trim() !== "") {
      const ipAddresses = data.trim().split("\n");

      // Check for duplicate IPs
      const uniqueIPs = new Set(ipAddresses);

      if (uniqueIPs.size !== ipAddresses.length) {
        return false; // There are duplicate IPs
      }

      // Check for valid IP addresses using Zod's built-in validation
      const ipv4 = z.string().ip({ version: "v4" });
      const ipv6 = z.string().ip({ version: "v6" });

      return ipAddresses.every((ipAddress) => ipv4.safeParse(ipAddress).success || ipv6.safeParse(ipAddress).success);
    }

    return true; // Validation passes if the value is null, empty, or not a string
  }, {
    message: "Invalid IP address or duplicate IPs."
  }).optional(),

  role: z.enum(["admin", "super"]),
  active: z.boolean().default(false),
  pwForceChange: z.boolean().default(true)
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"]
});