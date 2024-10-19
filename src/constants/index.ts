import { NavLink, PresetAvatars } from "@/types";
import {
  LayoutDashboard,
  LockKeyhole,
  Settings,
  UserCog,
  Users2,
  BarChartHorizontal
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
        icon: icon,
        route: "/item1", 
        label: "Item 1",
        restrictions: []
      },
      { 
        icon: icon,
        route: "/item2", 
        label: "Item 2",
        restrictions: []
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
    icon: Users2,
    requiresAuth: true,
    restrictions: ["super"],
    hidden: false
  },
  { 
    route: "/panel/reports", 
    label: "Reports",
    icon: BarChartHorizontal,
    requiresAuth: true,
    restrictions: ["super"],
    hidden: false,
    subMenu: [
      { 
        route: "/panel/reports/admin/logs", 
        label: "Admin Logs",
        icon: BarChartHorizontal,
        restrictions: ["super"]
      },
    ]
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
        restrictions: []
      },
      { 
        route: "/panel/settings/pwchange", 
        label: "Password Change",
        icon: LockKeyhole,
        restrictions: []
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

export const presetAvatars: PresetAvatars[] = [
  { 
    fileName: "default-avatar.png",
    path: "/assets/avatars/default-avatar.png"
  },
  { 
    fileName: "preset-avatar-female-01.png",
    path: "/assets/avatars/preset-avatar-female-01.png"
  },
  { 
    fileName: "preset-avatar-female-02.png",
    path: "/assets/avatars/preset-avatar-female-02.png"
  },
  { 
    fileName: "preset-avatar-female-03.png",
    path: "/assets/avatars/preset-avatar-female-03.png"
  },
  { 
    fileName: "preset-avatar-male-01.png",
    path: "/assets/avatars/preset-avatar-male-01.png"
  },
  { 
    fileName: "preset-avatar-male-02.png",
    path: "/assets/avatars/preset-avatar-male-02.png"
  },
  { 
    fileName: "preset-avatar-male-03.png",
    path: "/assets/avatars/preset-avatar-male-03.png"
  },
]
