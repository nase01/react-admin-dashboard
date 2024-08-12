import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { navLinks } from "@/constants";
import { Location } from "react-router-dom";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getJwt = (): string | null => {
	return localStorage.getItem('jwt');
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