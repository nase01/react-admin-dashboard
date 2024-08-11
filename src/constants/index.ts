import { NavLink } from "@/types";

export const navLinks: NavLink[] = [
  { 
    route: "/sign-in", 
    label: "Signin",
    requiresAuth: false,
    requiresRole: [],
  },
  { 
    route: "/panel/dashboard", 
    label: "Dashboard",
    requiresAuth: true,
    requiresRole: [],
  },
  { 
    route: "/panel/users", 
    label: "Users",
    requiresAuth: true,
    requiresRole: [],
  },
  { 
    route: "/unauthorized", 
    label: "Unauthorized" ,
    requiresAuth: false,
    requiresRole: [],
  },
];