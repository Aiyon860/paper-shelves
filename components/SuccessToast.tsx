"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export function SuccessToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const success = searchParams.get("success");

    if (success) {
      if (success === "added") {
        toast.success("Book added successfully!");
      } else if (success === "updated") {
        toast.success("Book updated successfully!");
      }

      // Remove the success parameter from the URL cleanly
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("success");

      const newUrl =
        pathname +
        (newSearchParams.toString() ? `?${newSearchParams.toString()}` : "");

      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  return null;
}
