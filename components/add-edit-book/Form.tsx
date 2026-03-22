"use client";

import { addBook, updateBook } from "../../lib/actions";
import { useActionState, useEffect, useRef } from "react";
import { SubmitButton } from "./SubmitBtn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tables } from "@/lib/schemas";
import { toast } from "sonner";

interface FormProps {
  isEdit?: boolean;
  initialData?: Tables<"books"> & {
    book_categories?:
      | { categories: { id: string; name: string } | null }[]
      | null;
  };
  categories?: { id: string; name: string }[];
}

export default function Form({
  isEdit = false,
  initialData,
  categories = [],
}: FormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const initialCategoryIds =
    initialData?.book_categories
      ?.map((bc) => bc.categories?.id)
      .filter(Boolean) || [];

  const actionToUse =
    isEdit && initialData ? updateBook.bind(null, initialData.id) : addBook;

  const [state, formAction, isPending] = useActionState(actionToUse, {
    status: "",
    errors: {},
    message: "",
  });

  type fieldErrors = {
    title?: string[];
    author?: string[];
    description?: string[];
  };

  const errors: fieldErrors = state?.errors || {};
  const titleErrors = errors?.title;
  const titleHasError = titleErrors && titleErrors.length > 0;
  const authorErrors = errors?.author;
  const authorHasError = authorErrors && authorErrors.length > 0;
  const descriptionErrors = errors?.description;
  const descriptionHasError = descriptionErrors && descriptionErrors.length > 0;

  useEffect(() => {
    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-8">
      <div className="space-y-3">
        <Label
          htmlFor="title"
          className={`text-base font-medium text-foreground flex items-center gap-1 ${titleHasError ? "text-destructive" : ""} ${isPending ? "opacity-70" : ""}`}
        >
          Title
          <span className="text-destructive text-sm">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          defaultValue={initialData?.title || ""}
          placeholder="e.g., The Great Gatsby"
          required
          disabled={isPending}
          className={`bg-background/50 h-14 text-base px-4 transition-all shadow-sm placeholder:text-muted-foreground/60 ${
            titleHasError
              ? "border-destructive focus-visible:ring-destructive focus-visible:border-destructive"
              : "focus-visible:ring-primary focus-visible:border-primary"
          } ${isPending ? "opacity-60 cursor-not-allowed bg-muted/50" : ""}`}
          aria-invalid={titleHasError ? "true" : "false"}
          aria-describedby={titleHasError ? "title-error" : undefined}
        />
        {titleHasError && (
          <div
            id="title-error"
            className="text-sm font-medium text-destructive mt-1.5 animate-in slide-in-from-top-1 fade-in duration-300"
            aria-live="polite"
          >
            {titleErrors.map((error: string) => (
              <p key={error} className="flex items-center gap-1.5">
                <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-3">
        <Label
          htmlFor="author"
          className={`text-base font-medium text-foreground flex items-baseline gap-2 ${authorHasError ? "text-destructive" : ""} ${isPending ? "opacity-70" : ""}`}
        >
          Author
          <span className="text-muted-foreground font-normal text-xs uppercase tracking-wider">
            (Optional)
          </span>
        </Label>
        <Input
          id="author"
          name="author"
          defaultValue={initialData?.author || ""}
          placeholder="e.g., F. Scott Fitzgerald"
          disabled={isPending}
          className={`bg-background/50 h-14 text-base px-4 transition-all shadow-sm placeholder:text-muted-foreground/60 ${
            authorHasError
              ? "border-destructive focus-visible:ring-destructive focus-visible:border-destructive"
              : "focus-visible:ring-primary focus-visible:border-primary"
          } ${isPending ? "opacity-60 cursor-not-allowed bg-muted/50" : ""}`}
          aria-invalid={authorHasError ? "true" : "false"}
          aria-describedby={authorHasError ? "author-error" : undefined}
        />
        {authorHasError && (
          <div
            id="author-error"
            className="text-sm font-medium text-destructive mt-1.5 animate-in slide-in-from-top-1 fade-in duration-300"
            aria-live="polite"
          >
            {authorErrors.map((error: string) => (
              <p key={error} className="flex items-center gap-1.5">
                <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-3">
        <Label
          htmlFor="description"
          className={`text-base font-medium text-foreground flex items-baseline gap-2 ${descriptionHasError ? "text-destructive" : ""} ${isPending ? "opacity-70" : ""}`}
        >
          Synopsis / Description
          <span className="text-muted-foreground font-normal text-xs uppercase tracking-wider">
            (Optional)
          </span>
        </Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={initialData?.description || ""}
          placeholder="A brief summary or personal notes about this literary work..."
          disabled={isPending}
          className={`min-h-40 bg-background/50 text-base p-4 resize-y transition-all shadow-sm leading-relaxed placeholder:text-muted-foreground/60 ${
            descriptionHasError
              ? "border-destructive focus-visible:ring-destructive focus-visible:border-destructive"
              : "focus-visible:ring-primary focus-visible:border-primary"
          } ${isPending ? "opacity-60 cursor-not-allowed bg-muted/50" : ""}`}
          aria-invalid={descriptionHasError ? "true" : "false"}
          aria-describedby={
            descriptionHasError ? "description-error" : undefined
          }
        />
        {descriptionHasError && (
          <div
            id="description-error"
            className="text-sm font-medium text-destructive mt-1.5 animate-in slide-in-from-top-1 fade-in duration-300"
            aria-live="polite"
          >
            {descriptionErrors.map((error: string) => (
              <p key={error} className="flex items-center gap-1.5">
                <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-3">
        <Label
          className={`text-base font-medium text-foreground flex items-baseline gap-2 ${isPending ? "opacity-70" : ""}`}
        >
          Categories
          <span className="text-muted-foreground font-normal text-xs uppercase tracking-wider">
            (Optional)
          </span>
        </Label>
        <div
          className={`grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-background/50 rounded-md border border-input shadow-sm ${
            isPending ? "opacity-60 cursor-not-allowed bg-muted/50" : ""
          }`}
        >
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`category-${category.id}`}
                name="categories"
                value={category.id}
                defaultChecked={initialCategoryIds.includes(category.id)}
                disabled={isPending}
                className="h-4 w-4 rounded border-primary text-primary focus:ring-primary cursor-pointer accent-primary"
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-sm text-muted-foreground col-span-full">
              No categories available.
            </p>
          )}
        </div>
      </div>
      <div className="pt-6 flex justify-end border-t border-border/50">
        <SubmitButton isEdit={isEdit} />
      </div>
    </form>
  );
}
