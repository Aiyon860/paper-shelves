import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(title: string, id: string): string {
  const formattedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const shortId = id.substring(id.length - 6);

  return `${formattedTitle}-${shortId}`;
}

export function extractIdFromSlug(slug: string): string {
  // The UUID's last 6 chars are at the end of the slug after the last hyphen
  const parts = slug.split("-");
  return parts[parts.length - 1];
}
