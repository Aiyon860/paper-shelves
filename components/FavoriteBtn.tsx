"use client";

import { useOptimistic, useTransition } from "react";
import { toggleFavorite } from "@/app/_actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { toast } from "sonner";

export function FavoriteBtn({
  bookId,
  initialFavorite,
}: {
  bookId: string;
  initialFavorite: boolean;
}) {
  const [, startTransition] = useTransition();

  const [isFavorite, setIsFavorite] = useOptimistic(
    initialFavorite,
    (state, isFav: boolean) => isFav,
  );

  const handleClick = () => {
    startTransition(async () => {
      setIsFavorite(!isFavorite);
      const { status, message } = await toggleFavorite(bookId, isFavorite);
      if (status === "error") {
        toast.error(message);
      } else if (status === "success") {
        toast.success(message);
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className="rounded-full hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all duration-300",
          isFavorite
            ? "fill-red-500 text-red-500 scale-110"
            : "text-muted-foreground scale-100",
        )}
      />
    </Button>
  );
}
