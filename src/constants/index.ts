import { NavLink } from "@/types";
import {
  LayoutDashboard,
  LockKeyhole,
  Settings,
  UserCog,
  Users,
} from "lucide-react";

/*
  * Setup
  - Set hidden to false to hide it from navigation bar
  - Role Restrictions:
    > [] = Allowed all roles
    > ["admin"] = Allowed admin and super users
    > ["super"] = Allowed super users only
    > subMenu: [
      { 
        route: "/item1", 
        label: "Item 1",
      },
      { 
        route: "/item2", 
        label: "Item 2",
      },
    ]
        
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
    icon: LayoutDashboard,
    requiresAuth: true,
    restrictions: [],
    hidden: false
  },
  { 
    route: "/panel/users", 
    label: "Users",
    icon: Users,
    requiresAuth: true,
    restrictions: ["super"],
    hidden: false
  },
  { 
    route: "/panel/users/create", 
    label: "Create User",
    requiresAuth: true,
    restrictions: ["super"],
    hidden: true
  },
  { 
    route: "/panel/users/edit/:id", 
    label: "Edit User",
    requiresAuth: true,
    restrictions: ["super"],
    hidden: true
  },
  { 
    route: "/panel/settings", 
    label: "Settings",
    icon: Settings,
    requiresAuth: true,
    restrictions: [],
    hidden: false,
    subMenu: [
      { 
        route: "/panel/settings/account", 
        label: "Account Settings",
        icon: UserCog,
      },
      { 
        route: "/panel/settings/pwchange", 
        label: "Password Change",
        icon: LockKeyhole
      }
    ]
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

export const toastConfig = {
  position: "bottom-center" as const,
  duration: 3000,
  style: {
    padding: "14px",
    background: "#0f172a",
    color: "#fff",
  }
};