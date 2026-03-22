import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { deleteBook } from "@/lib/actions";
import { DeleteBookDialog } from "@/components/DeleteBookDialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Mock dependencies
vi.mock("@/app/actions", () => ({
  deleteBook: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("DeleteBookDialog", () => {
  const mockRouterPush = vi.fn();
  const mockRouterRefresh = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue({
      push: mockRouterPush,
      refresh: mockRouterRefresh,
    } as unknown as ReturnType<typeof useRouter>);
  });

  it("renders the delete button and opens the dialog", () => {
    render(<DeleteBookDialog bookId="123" bookTitle="Test Book" />);

    const triggerBtn = screen.getByRole("button", { name: /delete/i });
    expect(triggerBtn).toBeInTheDocument();

    // Open dialog
    fireEvent.click(triggerBtn);
    expect(screen.getByText(/burn this manuscript\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Book/i)).toBeInTheDocument();
  });

  it("calls deleteBook, shows success toast, and redirects on confirm", async () => {
    vi.mocked(deleteBook).mockResolvedValue({
      status: "success",
      message: "Deleted successfully",
    });

    render(<DeleteBookDialog bookId="123" bookTitle="Test Book" />);

    // Open dialog
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    // Confirm delete
    fireEvent.click(screen.getByRole("button", { name: /yes, burn it/i }));

    await waitFor(() => {
      expect(deleteBook).toHaveBeenCalledWith("123");
      expect(toast.success).toHaveBeenCalledWith("Deleted successfully");
      expect(mockRouterPush).toHaveBeenCalledWith("/");
      expect(mockRouterRefresh).toHaveBeenCalled();
    });
  });

  it("shows error toast if deletion fails", async () => {
    vi.mocked(deleteBook).mockResolvedValue({
      status: "error",
      message: "Failed to delete",
    });

    render(<DeleteBookDialog bookId="123" bookTitle="Test Book" />);

    // Open dialog
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    // Confirm delete
    fireEvent.click(screen.getByRole("button", { name: /yes, burn it/i }));

    await waitFor(() => {
      expect(deleteBook).toHaveBeenCalledWith("123");
      expect(toast.error).toHaveBeenCalledWith("Failed to delete");
      expect(mockRouterPush).not.toHaveBeenCalled();
    });
  });
});
