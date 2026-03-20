import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, BookOpen, Calendar, User, Pencil } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { extractIdFromSlug, generateSlug } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FavoriteBtn } from "@/components/FavoriteBtn";
import { DeleteBookDialog } from "@/components/DeleteBookDialog";

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BookDetailPage({ params }: BookPageProps) {
  const { slug } = await params;
  const partialId = extractIdFromSlug(slug);

  // Since we only have the last 6 chars of the UUID, we need to find it using a ilike filter
  const { data: books, error } = await supabase
    .from("books")
    .select("*, book_categories(categories(id, name))")
    .ilike("id_text", `%${partialId}`)
    .limit(1);

  if (error || !books || books.length === 0) {
    notFound();
  }

  const book = books[0];
  const realSlug = generateSlug(book.title, book.id);

  if (slug !== realSlug) {
    redirect(`/${realSlug}`);
  }

  const formattedDate = new Date(book.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl animate-in fade-in duration-500">
      {/* Navigation */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="-ml-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Library
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
        {/* Left Column: Simulated Book Cover */}
        <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
          <div className="relative aspect-2/3 w-full md:max-w-xs overflow-hidden rounded-md bg-linear-to-br from-secondary via-background to-muted border border-border/50 shadow-lg dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            {/* Book spine simulation */}
            <div className="absolute left-0 top-0 bottom-0 w-5 bg-linear-to-r from-black/10 via-black/5 to-transparent dark:from-black/30 z-10" />
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/50 dark:bg-white/5 z-20" />
            <div className="absolute left-5 top-0 bottom-0 w-px bg-white/30 dark:bg-white/5 z-20" />

            {/* Cover text */}
            <div className="absolute inset-0 p-6 pt-12 flex flex-col items-center text-center z-30">
              <h1 className="font-serif text-2xl font-bold leading-snug text-foreground/90 line-clamp-5">
                {book.title}
              </h1>
              <div className="w-8 h-0.5 bg-primary/40 rounded-full my-6" />
              <p className="font-sans text-xs font-semibold tracking-widest uppercase text-muted-foreground line-clamp-3">
                {book.author || "Unknown Author"}
              </p>
            </div>

            {/* Decorative Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent pointer-events-none z-40" />
          </div>
        </div>

        {/* Right Column: Book Details */}
        <div className="flex-1 flex flex-col pt-2">
          <div className="flex items-start justify-between gap-6 mb-4">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-tight">
              {book.title}
            </h1>
            <div className="pt-2 shrink-0 bg-card/50 p-2 rounded-full border border-border/50 shadow-sm">
              <FavoriteBtn
                bookId={book.id}
                initialFavorite={book.is_favorite}
              />
            </div>
          </div>

          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground/80 mb-10 pb-6 border-b border-border/50">
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-primary/80" />
              <span className="text-foreground/80">
                {book.author || "Unknown Author"}
              </span>
            </div>
            <span className="hidden sm:inline-block text-border/60">•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary/80" />
              <span>Catalogued on {formattedDate}</span>
            </div>
            <span className="hidden sm:inline-block text-border/60">•</span>
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-primary/80" />
              <span>
                {book.book_categories && book.book_categories.length > 0
                  ? book.book_categories
                      .map(
                        (bc: { categories: { name: string } }) =>
                          bc.categories.name,
                      )
                      .filter(Boolean)
                      .join(", ")
                  : "Uncategorized"}
              </span>
            </div>
          </div>

          {/* Synopsis */}
          <div className="space-y-4">
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-muted-foreground">
              Synopsis
            </h3>
            <div className="prose prose-p:leading-relaxed prose-p:font-sans prose-p:text-lg prose-p:text-foreground/90 dark:prose-invert max-w-none">
              {book.description ? (
                // Simple splitting by newline to render multiple paragraphs if they exist
                book.description.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-muted-foreground/60 italic text-base">
                  No synopsis or description available for this manuscript in
                  the current archives. The contents remain a mystery waiting to
                  be discovered.
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              disabled
              className="font-medium px-8 h-12 text-base shadow-sm opacity-80 cursor-not-allowed bg-muted text-muted-foreground border border-border/50"
            >
              <BookOpen className="mr-2 h-5 w-5 opacity-60" />
              Read Manuscript (Coming Soon)
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="font-medium px-8 h-12 text-base shadow-sm transition-transform hover:-translate-y-0.5 bg-background hover:bg-secondary"
            >
              <Link href={`/${slug}/edit`}>
                <Pencil className="mr-2 h-5 w-5 text-primary" />
                Edit Details
              </Link>
            </Button>
            <DeleteBookDialog bookId={book.id} bookTitle={book.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
