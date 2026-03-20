import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HomeClient from "@/components/HomeClient";
import {
  useRouter,
  usePathname,
  useSearchParams,
  ReadonlyURLSearchParams,
} from "next/navigation";

// Mock Next.js navigation hooks
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

// Mock use-debounce so the callback executes immediately in tests
vi.mock("use-debounce", () => ({
  useDebouncedCallback: (fn: (...args: unknown[]) => unknown) => fn,
}));

// Mock React's useTransition to run the callback synchronously
vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useTransition: () => [false, (cb: () => void) => cb()],
  };
});

// Mock the BookCard component to isolate HomeClient testing
vi.mock("@/components/BookCard", () => ({
  BookCard: ({ title }: { title: string }) => (
    <div data-testid="book-card">{title}</div>
  ),
}));

const mockBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A classic novel.",
    is_favorite: false,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Dune",
    author: "Frank Herbert",
    description: "Sci-fi masterpiece.",
    is_favorite: true,
    created_at: "2023-01-02T00:00:00Z",
  },
];

describe("HomeClient", () => {
  const mockReplace = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue({
      replace: mockReplace,
    } as unknown as ReturnType<typeof useRouter>);
    vi.mocked(usePathname).mockReturnValue("/");
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams() as ReadonlyURLSearchParams,
    );
  });

  it("renders the empty state when there are no books and no search term", () => {
    render(<HomeClient books={[]} />);

    expect(screen.getByText("The shelves are empty")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Your digital library awaits its first masterpiece. Start building your curated collection today.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the 'no matching books' state when a search term is present but no books match", () => {
    // Mock the search params to simulate an active search
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams("search=unknown") as ReadonlyURLSearchParams,
    );

    render(<HomeClient books={[]} />);

    expect(screen.getByText("No matching books found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We couldn't find any books matching your search. Try adjusting your search term.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the list of books correctly", () => {
    render(<HomeClient books={mockBooks} />);

    const bookCards = screen.getAllByTestId("book-card");
    expect(bookCards).toHaveLength(2);
    expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
    expect(screen.getByText("Dune")).toBeInTheDocument();
  });

  it("updates the URL properly when typing in the search input", () => {
    render(<HomeClient books={mockBooks} />);

    const input = screen.getByPlaceholderText("Search by title...");

    // Simulate typing a search query
    fireEvent.change(input, { target: { value: "gatsby" } });

    // The replace function should be called with the new query params
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/?page=1&search=gatsby");
  });

  it("removes the search param from the URL when the input is cleared", () => {
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams("search=dune") as ReadonlyURLSearchParams,
    );

    render(<HomeClient books={mockBooks} />);

    const input = screen.getByPlaceholderText("Search by title...");

    // Simulate clearing the search query
    fireEvent.change(input, { target: { value: "" } });

    // It should maintain page=1 but drop the search param
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/?page=1");
  });
});
