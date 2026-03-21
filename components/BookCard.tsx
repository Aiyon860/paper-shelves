import * as React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FavoriteBtn } from "@/components/FavoriteBtn";
import { Tables } from "@/lib/schemas";
import { generateSlug } from "@/lib/utils";
import Link from "next/link";

type BookCardProps = Tables<"books"> & {
  book_categories?:
    | { categories: { id: string; name: string } | null }[]
    | null;
};

export function BookCard(book: BookCardProps) {
  const {
    id,
    title,
    author,
    description,
    is_favorite,
    created_at,
    book_categories,
  } = book;

  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 border-border/60 hover:shadow-xl hover:-translate-y-1 bg-card/80 backdrop-blur-sm dark:hover:shadow-primary/10">
      <Link
        href={`/${generateSlug(title, id)}`}
        className="flex flex-col flex-1"
      >
        <div className="p-5 pb-0">
          <div className="relative aspect-2/3 w-full shrink-0 overflow-hidden rounded-md bg-linear-to-br from-secondary via-background to-muted border border-border/50 shadow-sm dark:shadow-[0_2px_10px_rgba(0,0,0,0.4)] transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-md">
            <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-linear-to-r from-black/10 via-black/5 to-transparent dark:from-black/30 z-10" />
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/50 dark:bg-white/5 z-20" />
            <div className="absolute left-3.5 top-0 bottom-0 w-px bg-white/30 dark:bg-white/5 z-20" />
            <div className="absolute inset-0 p-4 pt-8 flex flex-col items-center text-center z-30">
              <h4 className="font-serif text-lg font-bold leading-snug text-foreground/90 line-clamp-4">
                {title}
              </h4>
              <div className="w-6 h-0.5 bg-primary/40 rounded-full my-4" />
              <p className="font-sans text-[10px] font-semibold tracking-widest uppercase text-muted-foreground line-clamp-2">
                {author || "Unknown Author"}
              </p>
            </div>
          </div>
        </div>

        <CardContent className="flex flex-col flex-1 p-5 gap-3">
          <div className="space-y-1.5">
            <h3
              className="font-serif text-xl font-semibold leading-snug text-foreground line-clamp-2"
              title={title}
            >
              {title}
            </h3>
            <p
              className={`font-sans text-sm font-medium line-clamp-1 ${author ? "text-primary/80" : "text-muted-foreground/60 italic"}`}
            >
              {author || "Unknown Author"}
            </p>
            {book_categories && book_categories.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {book_categories.map(
                  (bc, i) =>
                    bc.categories && (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary/80"
                      >
                        {bc.categories.name}
                      </span>
                    ),
                )}
              </div>
            )}
          </div>

          <p
            className={`font-sans text-sm leading-relaxed line-clamp-3 ${description ? "text-muted-foreground" : "text-muted-foreground/60 italic"}`}
          >
            {description ||
              "No synopsis or description available for this manuscript in the current archives."}
          </p>

          <div className="mt-auto pt-5 flex items-end justify-between">
            <p className="font-sans text-[11px] font-medium tracking-wide uppercase text-muted-foreground/80">
              {formattedDate}
            </p>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="px-5 pb-5 pt-0 flex justify-end bg-transparent border-t-0">
        <FavoriteBtn bookId={id} initialFavorite={is_favorite} />
      </CardFooter>
    </Card>
  );
}
