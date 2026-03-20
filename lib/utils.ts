import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(title: string, id: string): string {
  // Convert title to lowercase, replace non-alphanumeric chars with hyphens
  const formattedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, ""); // Remove leading/trailing hyphens

  // Extract last 6 characters of the UUID
  const shortId = id.substring(id.length - 6);

  return `${formattedTitle}-${shortId}`;
}

export function extractIdFromSlug(slug: string): string {
  // The UUID's last 6 chars are at the end of the slug after the last hyphen
  const parts = slug.split("-");
  return parts[parts.length - 1];
}
