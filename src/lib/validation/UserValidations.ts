import * as z from "zod";
import { strongPWOptions, confirmPWOptions  } from "./common/strongPWOptions";

export const UserValidation = z.object({
  name: z.string().refine((data) => data.trim() !== "", {
    message: "Name is required."
  }),
  email: z.string().email(),
  password: strongPWOptions,
  passwordConfirm: confirmPWOptions,

  // Todo: Fix bug on ipWhiteList
  ipWhitelist: z.array(
    z.string().refine((ip) => {
      const ipv4 = z.string().ip({ version: "v4" });
      const ipv6 = z.string().ip({ version: "v6" });
      return ipv4.safeParse(ip).success || ipv6.safeParse(ip).success;
    }, {
      message: "Invalid IP address."
    })
  ).default([]).refine((ipList) => {
    const uniqueIPs = new Set(ipList);
    return uniqueIPs.size === ipList.length;
  }, {
    message: "Duplicate IP addresses found."
  }),

  role: z.enum(["admin", "super"]),
  active: z.boolean().default(false),
  pwForceChange: z.boolean().default(true)
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"]
});