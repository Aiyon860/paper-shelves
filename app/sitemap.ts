import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { generateSlug, getBaseUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  // Base static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/add`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  try {
    // Attempt to fetch books for dynamic routes
    const supabase = await createClient();
    const { data: books } = await supabase
      .from("books")
      .select("id, title, created_at");

    if (books && books.length > 0) {
      const bookRoutes: MetadataRoute.Sitemap = books.map((book) => ({
        url: `${baseUrl}/${generateSlug(book.title, book.id)}`,
        lastModified: new Date(book.created_at || new Date()),
        changeFrequency: "weekly",
        priority: 0.6,
      }));

      routes.push(...bookRoutes);
    }
  } catch (error) {
    console.error("Error generating sitemap dynamic routes:", error);
  }

  return routes;
}
