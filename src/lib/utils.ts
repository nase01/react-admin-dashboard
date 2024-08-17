import { type ClassValue, clsx } from "clsx";
import { jwtDecode } from "jwt-decode";
import { twMerge } from "tailwind-merge";
import { navLinks } from "@/constants";
import { Location } from "react-router-dom";
import { JwtPayload } from "@/types";

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
  let title = "RAD";

  const matchingLink = navLinks.find((link) => {
    
    // Handle wildcard route for 404
    if (link.route === "*") {
      return location.pathname !== "/" && !navLinks.some(navLink => navLink.route === location.pathname);
    }
    return link.route === location.pathname;
  });

  if (matchingLink) {
    title = `${matchingLink.label} - ${title}`;
  }

  document.title = title;
};

export const getNavLinks = () => {
  const jwtPayload = getJwtPayload();

  return navLinks.filter((link) => {
    if (link.hidden) return false;
    if (!link.requiresAuth) return true;

    if (!jwtPayload) return false;

    const { role } = jwtPayload;
    const { restrictions } = link;

    if (role === "super") return true;

    if (restrictions.length === 0) return true;
    if (restrictions.includes(role)) return true;

    return false;
  });
};