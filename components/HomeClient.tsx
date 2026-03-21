"use client";

import { Library, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";
import { BookCard } from "@/components/BookCard";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";

type Book = {
  id: string;
  title: string;
  author: string | null;
  description: string | null;
  is_favorite: boolean | null;
  created_at: string;
  book_categories?:
    | { categories: { id: string; name: string } | null }[]
    | null;
};

export default function HomeClient({ books }: { books: Book[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const prevPending = useRef(isPending);

  useEffect(() => {
    if (prevPending.current && !isPending) {
      inputRef.current?.focus();
    }
    prevPending.current = isPending;
  }, [isPending]);

  const searchTerm = searchParams.get("search");

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Curated for You
          </h1>
          <p className="mt-3 text-lg font-sans text-muted-foreground max-w-2xl">
            A sophisticated selection of literary works, meticulously chosen to
            inspire and comfort.
          </p>
        </div>

        <div className="relative w-full md:w-72 shrink-0">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-opacity ${isPending ? "opacity-50" : "opacity-100"}`}
            strokeWidth={1.5}
          />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search by title..."
            disabled={isPending}
            className={`w-full pl-9 bg-background transition-all duration-300 ${isPending ? "opacity-60 cursor-not-allowed bg-muted/50" : ""}`}
            defaultValue={searchParams.get("search")?.toString()}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>

      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-border/60 rounded-2xl bg-card/20">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-muted-foreground mb-5 shadow-sm">
            <Library className="h-8 w-8 text-primary/80" strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
            {searchTerm ? "No matching books found" : "The shelves are empty"}
          </h2>
          <p className="text-muted-foreground max-w-md">
            {searchTerm
              ? "We couldn't find any books matching your search. Try adjusting your search term."
              : "Your digital library awaits its first masterpiece. Start building your curated collection today."}
          </p>
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 transition-opacity duration-300 ${isPending ? "opacity-60 pointer-events-none" : "opacity-100"}`}
        >
          {books.map((book) => (
            <BookCard
              key={book.id}
              {...book}
              id_text={book.id}
              is_favorite={book.is_favorite ?? false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
