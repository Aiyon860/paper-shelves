"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center animate-in fade-in duration-700">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10 border border-destructive/20 shadow-sm relative overflow-hidden group">
        <div className="absolute inset-0 bg-destructive/5 group-hover:bg-destructive/10 transition-colors duration-500" />
        <AlertTriangle
          className="h-10 w-10 text-destructive relative z-10"
          strokeWidth={1.5}
        />
      </div>

      <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
        Archive Corrupted
      </h1>

      <p className="font-sans text-lg text-muted-foreground max-w-md mb-6 leading-relaxed">
        An unexpected disturbance occurred in the library system. We were unable
        to process your request at this time.
      </p>

      {error.message && (
        <div className="mb-8 max-w-xl w-full bg-muted/50 rounded-lg p-4 text-left border border-border/50 shadow-inner">
          <p className="font-mono text-xs text-muted-foreground break-words whitespace-pre-wrap">
            <span className="font-semibold text-foreground/80 block mb-1">
              Error Trace:
            </span>
            {error.message}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => reset()}
          size="lg"
          className="rounded-full px-8 font-medium shadow-sm transition-transform hover:-translate-y-0.5"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Attempt Recovery
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => (window.location.href = "/")}
          className="rounded-full px-8 font-medium shadow-sm transition-transform hover:-translate-y-0.5"
        >
          Return to Entrance
        </Button>
      </div>
    </div>
  );
}
