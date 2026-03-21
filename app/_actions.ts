"use server";

import { BookSchema } from "@/lib/definitions";
import { createClient } from "@/lib/supabase/server";
import { generateSlug } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export type ActionState = {
  status: string;
  errors?: {
    title?: string[];
    author?: string[];
    description?: string[];
  };
  message?: string;
  updatedSlug?: string;
};

export async function addBook(initialState: ActionState, formData: FormData) {
  const book = BookSchema.safeParse({
    title: formData.get("title") as string,
    author: formData.get("author") as string | null | undefined,
    description: formData.get("description") as string | null | undefined,
  });

  if (!book.success) {
    return {
      status: "error",
      errors: book.error.flatten().fieldErrors,
      message: "Invalid book data",
    };
  }

  const categories = formData.getAll("categories") as string[];

  const supabase = await createClient();

  const { data: insertedBook, error } = await supabase
    .rpc("add_book_with_categories", {
      p_title: book.data.title,
      p_author: book.data.author || undefined,
      p_description: book.data.description || undefined,
      p_category_ids: categories.length > 0 ? categories : [],
    })
    .single();

  if (error || !insertedBook) {
    return {
      status: "error",
      message: "Failed to add book",
    };
  }

  revalidateTag("books", "max");

  const newSlug = insertedBook
    ? generateSlug(insertedBook.title, insertedBook.id)
    : undefined;

  if (newSlug) {
    redirect(`/${newSlug}?success=added`);
  } else {
    redirect(`/?success=added`);
  }
}

export async function updateBook(
  bookId: string,
  initialState: ActionState,
  formData: FormData,
) {
  const book = BookSchema.safeParse({
    title: formData.get("title") as string,
    author: formData.get("author") as string | null | undefined,
    description: formData.get("description") as string | null | undefined,
  });

  if (!book.success) {
    return {
      status: "error",
      errors: book.error.flatten().fieldErrors,
      message: "Invalid book data",
    };
  }

  const categories = formData.getAll("categories") as string[];

  const supabase = await createClient();

  const { data: returnedBook, error } = await supabase
    .rpc("update_book_with_categories", {
      p_book_id: bookId,
      p_title: book.data.title,
      p_author: book.data.author || undefined,
      p_description: book.data.description || undefined,
      p_category_ids: categories.length > 0 ? categories : [],
    })
    .single();

  if (error || !returnedBook) {
    return {
      status: "error",
      // message: "Failed to update book",
      message: JSON.stringify(error),
    };
  }

  revalidateTag("books", "max");
  const newSlug = returnedBook
    ? generateSlug(returnedBook.title, returnedBook.id)
    : undefined;

  if (newSlug) {
    redirect(`/${newSlug}?success=updated`);
  } else {
    redirect(`/?success=updated`);
  }
}

export async function toggleFavorite(bookId: string, favoriteStatus: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("books")
    .update({ is_favorite: !favoriteStatus })
    .eq("id", bookId);

  if (error) {
    return {
      status: "error",
      message: "Failed to toggle favorite",
    };
  }

  revalidateTag("books", "max");

  return {
    status: "success",
    message: "Favorite status updated",
  };
}

export async function deleteBook(bookId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .rpc("delete_book_with_categories", {
      p_book_id: bookId,
    })
    .single();

  if (error || data?.status === "error") {
    return {
      status: "error",
      message: "Failed to delete the manuscript from archives.",
    };
  }

  revalidateTag("books", "max");

  return {
    status: "success",
    message: "Manuscript has been permanently removed.",
  };
}
