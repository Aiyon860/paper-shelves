import { describe, it, expect } from "vitest";
import { BookSchema } from "../lib/definitions";

describe("Schema Definitions", () => {
  describe("BookSchema", () => {
    it("should successfully validate a complete and valid book object", () => {
      const validData = {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        description: "A classic novel about the American Dream.",
      };

      const result = BookSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should fail validation if the title is empty", () => {
      const invalidData = {
        title: "",
        author: "Anonymous",
        description: "No title provided.",
      };

      const result = BookSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Book title is required");
      }
    });

    it("should fail validation if the title is missing", () => {
      const invalidData = {
        author: "Anonymous",
      };

      const result = BookSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("should pass validation if author and description are omitted", () => {
      const validData = {
        title: "1984 (Book)",
      };

      const result = BookSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should pass validation if author and description are null", () => {
      const validData = {
        title: "Moby Dick",
        author: null,
        description: null,
      };

      const result = BookSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });
});
