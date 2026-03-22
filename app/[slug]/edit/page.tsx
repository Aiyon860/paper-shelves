import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { extractIdFromSlug, generateSlug } from "@/lib/utils";
import { AlertCircle, ArrowLeft, PenLine } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import dynamic from "next/dynamic";
const Form = dynamic(() => import("@/components/add-edit-book/Form"));
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { connection } from "next/server";

interface EditBookPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EditBookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const partialId = extractIdFromSlug(slug);

  const supabase = await createClient();
  const { data: books } = await supabase
    .from("books")
    .select("title")
    .ilike("id_text", `%${partialId}`)
    .limit(1);

  if (!books || books.length === 0) {
    return {
      title: "Edit Book",
    };
  }

  return {
    title: `Edit ${books[0].title}`,
    description: `Edit the details for ${books[0].title} in the library archives.`,
  };
}

export default async function EditBookPage({ params }: EditBookPageProps) {
  await connection();
  const { slug } = await params;
  const partialId = extractIdFromSlug(slug);

  const supabase = await createClient();
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
    redirect(`/${realSlug}/edit`);
  }

  // Fetch categories for the form
  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("id, name")
    .order("name");

  const key = crypto.randomUUID();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl animate-in fade-in duration-500">
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mr-4 -ml-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Link href={`/${realSlug}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Manuscript
          </Link>
        </Button>
      </nav>

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm">
            <PenLine className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Edit Manuscript Details
          </h1>
        </div>
        <p className="text-lg font-sans text-muted-foreground max-w-xl">
          Revise the catalogued information for &quot;
          <span className="italic text-foreground/80">{book.title}</span>
          &quot;.
        </p>
      </header>

      {categoriesError && (
        <div className="mb-6 p-4 rounded-md bg-destructive/10 text-destructive flex items-center gap-2 text-sm font-medium">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>
            Failed to load categories. You can still edit the book, but category
            selection might be unavailable.
          </p>
        </div>
      )}

      <Card className="border-border/60 shadow-lg bg-card/80 backdrop-blur-sm dark:shadow-black/40 overflow-hidden py-0 gap-0">
        <div className="h-1.5 w-full bg-linear-to-r from-primary/40 via-primary to-primary/40" />
        <CardContent className="p-6 pt-8 sm:p-10">
          <Form
            key={key}
            isEdit={true}
            initialData={book}
            categories={categories || []}
          />
        </CardContent>
      </Card>
    </div>
  );
}
