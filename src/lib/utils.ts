import { type ClassValue, clsx } from "clsx";
import { jwtDecode } from "jwt-decode";
import { twMerge } from "tailwind-merge";
import { navLinks } from "@/constants";
import { Location } from "react-router-dom";
import { JwtPayload, NavLink, SubMenuItem } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getJwt = (): string | null => {
	return localStorage.getItem('jwt');
};

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

export const getNavLinks = () => {
  const jwtPayload = getJwtPayload();
  const role = jwtPayload?.role;

  return navLinks.filter((link) => {
    if (link.hidden) return false;
    if (!link.requiresAuth) return true;

    if (!jwtPayload) return false;

    const { restrictions } = link;

    if (role === "super") return true;

    if (restrictions.length === 0) return true;
    if (role && restrictions.includes(role)) return true;

    return false;
  }).map((link) => {
    // Filter the subMenu if it exists
    if (link.subMenu) {
      link.subMenu = link.subMenu.filter((subLink) => {
        const { restrictions: subRestrictions } = subLink;

        if (role === "super") return true;

        if (subRestrictions.length === 0) return true;
        if (role && subRestrictions.includes(role)) return true;

        return false;
      });
    }

    return link;
  })
  .filter((link) => {
    // If the link has a subMenu, only include it if the submenu is not empty
    if (link.subMenu && link.subMenu.length === 0) {
      return false;
    }
    return true;
  });
};

export const matchRoute = (routePattern: string, path: string): boolean => {
  const pattern = routePattern
    .replace(/:[^\s/]+/g, '[^/]+') 
    .replace(/\*/g, '.*'); 
  const regex = new RegExp(`^${pattern}$`);
  return regex.test(path);
};

export const parseIPWhitelist = (ipWhitelist?: string): string[] => {
  return ipWhitelist
    ? ipWhitelist
      .split('\n')                  
      .map((ip: string) => ip.trim()) 
      .filter((ip: string) => ip !== "") 
    : [];                           
};

export const ucFirst = (word: string) => {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
};