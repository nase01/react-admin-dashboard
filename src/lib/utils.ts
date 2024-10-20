import { type ClassValue, clsx } from "clsx";
import { jwtDecode } from "jwt-decode";
import { twMerge } from "tailwind-merge";
import { navLinks } from "@/constants";
import { Location } from "react-router-dom";
import { JwtPayload, NavLink, SubMenuItem } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get jwt value stored on local storate
export const getJwt = (): string | null => {
	return localStorage.getItem('jwt');
};

// Decode JWT values
export const getJwtPayload = (): JwtPayload | null => {
  const token = getJwt();

  if (!token) {
    return null;
  }
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Update page title by concatinating navLink's label and app title
export const updatePageTitle = (location: Location) => {
  let title = "RPanel";

  const findMatchingLink = (links: NavLink[]): NavLink | undefined => {
    return links.find((link: NavLink) => {

      // Handle wildcard route for 404
      if (link.route === "*") {
        return (
          location.pathname !== "/" &&
          !navLinks.some((navLink: NavLink) =>
            matchRoute(navLink.route, location.pathname)
          )
        );
      }

      // Check if the route matches or any subMenu route matches
      return (
        matchRoute(link.route, location.pathname) ||
        (link.subMenu &&
          link.subMenu.some((subLink: SubMenuItem) =>
            matchRoute(subLink.route, location.pathname)
          ))
      );
    });
  };

  // Find the matching link or submenu link
  const matchingLink = findMatchingLink(navLinks);

  if (matchingLink) {
    
    // Check if the location matches a subMenu item
    const matchingSubLink = matchingLink.subMenu?.find((subLink: SubMenuItem) =>
      matchRoute(subLink.route, location.pathname)
    );

    if (matchingSubLink) {
      title = `${matchingSubLink.label} - ${title}`;
    } else {
      title = `${matchingLink.label} - ${title}`;
    }
  }

  document.title = title;
};

// Filter allowed links on navLInks base on user role
export const getAllowedLinks = (): NavLink[] => {
  const jwtPayload = getJwtPayload();
  const role = jwtPayload?.role;

  // Filter for subMenu items of type SubMenuItem
  const filterSubMenu = (subMenu: SubMenuItem[]): SubMenuItem[] => {
    return subMenu.filter((item) => {
      if (!jwtPayload) return false; // SubMenu items require authentication
      const { restrictions } = item;

      if (role === "super") return true;
      if (restrictions.length === 0) return true;
      if (role && restrictions.includes(role)) return true;

      return false;
    });
  };

  // Filter for top-level NavLink items
  const filterLinks = (links: NavLink[]): NavLink[] => {
    return links
      .filter((link) => {
        if (link.hidden) return false;
        if (!link.requiresAuth) return true;
        if (!jwtPayload) return false;

        const { restrictions } = link;

        if (role === "super") return true;
        if (restrictions.length === 0) return true;
        if (role && restrictions.includes(role)) return true;

        return false;
      })
      .map((link) => {
        // If the link has a subMenu, apply the SubMenu-specific filtering
        if (link.subMenu) {
          return {
            ...link,
            subMenu: filterSubMenu(link.subMenu), // Filter subMenu using filterSubMenu
          };
        }
        return link;
      });
  };

  return filterLinks(navLinks);
};

// Check current route if exist on navLinks
export const matchRoute = (routePattern: string, path: string): boolean => {
  const pattern = routePattern
    .replace(/:[^\s/]+/g, '[^/]+') 
    .replace(/\*/g, '.*'); 
  const regex = new RegExp(`^${pattern}$`);
  return regex.test(path);
};

// Convert string of ipWhitelist seperated with line breaks in to array strings
export const parseIPWhitelist = (ipWhitelist?: string): string[] => {
  return ipWhitelist
    ? ipWhitelist
      .split('\n')                  
      .map((ip: string) => ip.trim()) 
      .filter((ip: string) => ip !== "") 
    : [];                           
};

// Capitalize first character of each word
export const ucFirst = (word: string) => {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// Function to format date
export function numberFormat(value: number, withComma = true) {
  return withComma 
  ? value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  : value.toFixed(2);
}