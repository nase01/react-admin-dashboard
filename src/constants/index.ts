import { NavLink } from "@/types";

/*
  * Setup
  - Set hidden to false to hide it from navigation bar
  - Role Restrictions:
    > [] = Allowed all roles
    > ["admin"] = Allowed admin and super users
    > ["super"] = Allowed super users only
        
  * Note: Super user's automatically have access to all pages
*/

export const navLinks: NavLink[] = [
  { 
    route: "/sign-in", 
    label: "Signin",
    requiresAuth: false,
    restrictions: [],
    hidden: true
  },
  { 
    route: "/panel/dashboard", 
    label: "Dashboard",
    requiresAuth: true,
    restrictions: [],
    hidden: false
  },
  { 
    route: "/panel/users", 
    label: "Users",
    requiresAuth: true,
    restrictions: ["super"],
    hidden: false 
  },
  { 
    route: "/unauthorized", 
    label: "Error 401" ,
    requiresAuth: true,
    restrictions: [],
    hidden: true
  },
  { 
    route: "*", 
    label: "Error 404", 
    requiresAuth: true,
    restrictions: [],
    hidden: true
  },
];