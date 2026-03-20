import { z } from "zod";

export const BookSchema = z.object({
  title: z.string().min(1, "Book title is required"),
  author: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
});

export type FormState = {
  errors?: {
    title?: string[];
    author?: string[];
    description?: string[];
  };
  message?: string;
};
