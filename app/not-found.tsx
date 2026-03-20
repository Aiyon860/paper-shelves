import Link from "next/link";
import { BookX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center animate-in fade-in duration-700">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-secondary/80 border border-border shadow-sm">
        <BookX
          className="h-10 w-10 text-primary opacity-80"
          strokeWidth={1.5}
        />
      </div>

      <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
        Chapter Missing
      </h1>

      <p className="font-sans text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
        We searched the entire archives, but couldn&apos;t find the page you
        were looking for. The manuscript may have been moved or never existed.
      </p>

      <Button
        asChild
        size="lg"
        className="rounded-full px-8 font-medium shadow-sm transition-transform hover:-translate-y-0.5"
      >
        <Link href="/">Return to Library</Link>
      </Button>
    </div>
  );
}
