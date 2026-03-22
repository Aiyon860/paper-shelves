import type { Metadata } from "next";
import dynamic from "next/dynamic";

const HomeClient = dynamic(() => import("@/components/HomeClient"));
import { createClient } from "@/lib/supabase/server";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover Paper Shelves, a beautifully modern digital library application designed to help you seamlessly manage, organize, and track your personal book collection.",
};

export async function getBooks({
  from,
  to,
  searchQuery,
}: {
  from: number;
  to: number;
  searchQuery?: string;
}) {
  const supabase = await createClient();
  const q = supabase
    .from("books")
    .select(
      "id, title, author, description, is_favorite, created_at, book_categories(categories(id, name))",
      { count: "exact" },
    )
    .range(from, to)
    .order("created_at", { ascending: false });

  if (searchQuery) {
    q.ilike("title", `%${searchQuery}%`);
  }

  const { data: books, error, count } = await q;
  return { books, error, count };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const itemsPerPage = 5;
  const params = await searchParams;
  const searchQuery = params?.search?.toString().trim().toLowerCase();
  const currentPage = params?.page ? Number(params.page) : 1;
  const from = (currentPage - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const { books, error, count } = await getBooks({
    searchQuery,
    from,
    to,
  });

  const totalPages = count ? Math.ceil(count / itemsPerPage) : 1;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl">
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-border/80 rounded-2xl bg-card/30">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-5 shadow-sm">
            <AlertCircle className="h-8 w-8" strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
            Failed to load archives
          </h2>
          <p className="text-muted-foreground max-w-md">
            We encountered a problem while retrieving the books. Please try
            again later.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 shadow-sm"
          >
            Refresh Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <HomeClient
      books={books || []}
      currentPage={currentPage}
      totalPages={totalPages}
      searchQuery={searchQuery}
    />
  );
}
