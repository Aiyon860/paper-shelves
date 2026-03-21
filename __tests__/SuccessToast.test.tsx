import { render } from "@testing-library/react";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SuccessToast } from "@/components/SuccessToast";
import { toast } from "sonner";

// Mock dependencies
vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe("SuccessToast", () => {
  const mockReplace = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue({
      replace: mockReplace,
    } as unknown as ReturnType<typeof useRouter>);
    vi.mocked(usePathname).mockReturnValue("/some-path");
  });

  it("shows added success toast and removes param from URL", () => {
    // Setup searchParams with success=added
    const params = new URLSearchParams("?success=added");
    vi.mocked(useSearchParams).mockReturnValue(
      params as ReadonlyURLSearchParams,
    );

    render(<SuccessToast />);

    expect(toast.success).toHaveBeenCalledWith("Book added successfully!");
    expect(mockReplace).toHaveBeenCalledWith("/some-path", { scroll: false });
  });

  it("shows updated success toast and removes param from URL", () => {
    // Setup searchParams with success=updated
    const params = new URLSearchParams("?success=updated");
    vi.mocked(useSearchParams).mockReturnValue(
      params as ReadonlyURLSearchParams,
    );

    render(<SuccessToast />);

    expect(toast.success).toHaveBeenCalledWith("Book updated successfully!");
    expect(mockReplace).toHaveBeenCalledWith("/some-path", { scroll: false });
  });

  it("does nothing when success param is absent", () => {
    // Setup empty searchParams
    const params = new URLSearchParams();
    vi.mocked(useSearchParams).mockReturnValue(
      params as ReadonlyURLSearchParams,
    );

    render(<SuccessToast />);

    expect(toast.success).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("preserves other query parameters when removing success param", () => {
    // Setup searchParams with success=added & page=2
    const params = new URLSearchParams("?success=added&page=2");
    vi.mocked(useSearchParams).mockReturnValue(
      params as ReadonlyURLSearchParams,
    );

    render(<SuccessToast />);

    expect(toast.success).toHaveBeenCalledWith("Book added successfully!");
    // URL should now only contain page=2
    expect(mockReplace).toHaveBeenCalledWith("/some-path?page=2", {
      scroll: false,
    });
  });
});
