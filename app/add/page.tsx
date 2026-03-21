import Link from "next/link";
import { BookPlus, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Form from "@/components/add-edit-book/Form";
import { createClient } from "@/lib/supabase/server";
import { connection } from "next/server";

export default async function AddBookPage() {
  await connection();
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name");

  const key = crypto.randomUUID();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl animate-in fade-in duration-500">
      {/* Back Navigation */}
      <div className="mb-8 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mr-4 -ml-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Library
          </Link>
        </Button>
      </div>

      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm">
            <BookPlus className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Add New Manuscript
          </h1>
        </div>
        <p className="text-lg font-sans text-muted-foreground max-w-xl">
          Contribute a new title to the archives. Please provide the literary
          details below to catalogue it properly.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-md bg-destructive/10 text-destructive flex items-center gap-2 text-sm font-medium">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>
            Failed to load categories. You can still add a book without them.
          </p>
        </div>
      )}

      {/* Form Card */}
      <Card className="border-border/60 shadow-lg bg-card/80 backdrop-blur-sm dark:shadow-black/40 overflow-hidden py-0 gap-0">
        <div className="h-1.5 w-full bg-linear-to-r from-primary/40 via-primary to-primary/40" />
        <CardContent className="p-6 pt-8 sm:p-10">
          <Form key={key} categories={categories || []} />
        </CardContent>
      </Card>
    </div>
  );
}
