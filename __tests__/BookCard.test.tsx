import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BookCard } from "@/components/BookCard";

// Mock app/actions to prevent Supabase initialization in tests
vi.mock("@/lib/actions", () => ({
  toggleFavorite: vi.fn(),
  deleteBook: vi.fn(),
}));

describe("BookCard", () => {
  it("renders basic book information correctly", () => {
    render(
      <BookCard
        id="123"
        id_text="sample-book"
        title="Sample Book Title"
        author="John Doe"
        description="A great sample book."
        is_favorite={false}
        created_at="2024-01-01T00:00:00Z"
      />,
    );

    // Book spine/cover text and details text
    const titleElements = screen.getAllByText("Sample Book Title");
    expect(titleElements.length).toBeGreaterThan(0);

    const authorElements = screen.getAllByText("John Doe");
    expect(authorElements.length).toBeGreaterThan(0);

    expect(screen.getByText("A great sample book.")).toBeInTheDocument();
    expect(screen.getByText("January 1, 2024")).toBeInTheDocument();
  });

  it("renders unknown author if author is missing", () => {
    render(
      <BookCard
        id="123"
        id_text="unknown-author-book"
        title="Unknown Author Book"
        author={null}
        description={null}
        is_favorite={false}
        created_at="2024-01-01T00:00:00Z"
      />,
    );

    const unknownAuthorElements = screen.getAllByText("Unknown Author");
    expect(unknownAuthorElements.length).toBeGreaterThan(0);
    expect(
      screen.getByText(/No synopsis or description available/i),
    ).toBeInTheDocument();
  });

  it("renders categories when provided", () => {
    const mockCategories = [
      { categories: { id: "c1", name: "Fiction" } },
      { categories: { id: "c2", name: "Sci-Fi" } },
    ];

    render(
      <BookCard
        id="123"
        id_text="categorized-book"
        title="Categorized Book"
        author="Jane Doe"
        description="Book with categories"
        is_favorite={false}
        created_at="2024-01-01T00:00:00Z"
        book_categories={mockCategories}
      />,
    );

    expect(screen.getByText("Fiction")).toBeInTheDocument();
    expect(screen.getByText("Sci-Fi")).toBeInTheDocument();
  });
});
