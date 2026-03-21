import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditBookLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl animate-in fade-in duration-500">
      {/* Back Navigation Skeleton */}
      <div className="mb-8 flex items-center">
        <Skeleton className="h-9 w-40 rounded-md" />
      </div>

      {/* Page Header Skeleton */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Skeleton className="h-12 w-12 rounded-full shrink-0" />
          <Skeleton className="h-10 md:h-12 w-3/4 sm:w-1/2 rounded-lg" />
        </div>
        <div className="space-y-2 mt-4">
          <Skeleton className="h-5 w-full max-w-xl rounded" />
          <Skeleton className="h-5 w-4/5 max-w-md rounded" />
        </div>
      </div>

      {/* Form Card Skeleton */}
      <Card className="border-border/60 shadow-lg bg-card/80 backdrop-blur-sm dark:shadow-black/40 overflow-hidden py-0 gap-0">
        <div className="h-1.5 w-full bg-linear-to-r from-primary/40 via-primary to-primary/40" />
        <CardContent className="p-6 pt-8 sm:p-10 space-y-8">
          {/* Title Field Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-24 rounded" />
            <Skeleton className="h-14 w-full rounded-md" />
          </div>

          {/* Author Field Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-32 rounded" />
            <Skeleton className="h-14 w-full rounded-md" />
          </div>

          {/* Description Field Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-48 rounded" />
            <Skeleton className="h-40 w-full rounded-md" />
          </div>

          {/* Submit Button Skeleton */}
          <div className="pt-6 flex justify-end border-t border-border/50">
            <Skeleton className="h-14 w-full sm:w-50 rounded-md" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
