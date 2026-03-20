import { Skeleton } from "@/components/ui/skeleton";

export default function BookLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl animate-in fade-in duration-500">
      {/* Navigation Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-8 w-32 rounded-md" />
      </div>

      <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
        {/* Left Column: Simulated Book Cover Skeleton */}
        <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
          <Skeleton className="relative aspect-[2/3] w-full md:max-w-xs overflow-hidden rounded-md shadow-lg" />
        </div>

        {/* Right Column: Book Details Skeleton */}
        <div className="flex-1 flex flex-col pt-2">
          {/* Title Area */}
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="w-full space-y-3">
              <Skeleton className="h-10 md:h-14 lg:h-16 w-[85%] rounded-lg" />
              <Skeleton className="h-10 md:h-14 lg:h-16 w-[60%] rounded-lg" />
            </div>
            <div className="pt-2 shrink-0">
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </div>

          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-4 mb-10 pb-6 border-b border-border/50">
            <Skeleton className="h-5 w-32 rounded" />
            <span className="hidden sm:inline-block text-border/60">•</span>
            <Skeleton className="h-5 w-40 rounded" />
            <span className="hidden sm:inline-block text-border/60">•</span>
            <Skeleton className="h-5 w-36 rounded" />
          </div>

          {/* Synopsis */}
          <div className="space-y-5">
            <Skeleton className="h-4 w-24 rounded" />

            <div className="space-y-3">
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-[98%] rounded" />
              <Skeleton className="h-5 w-[95%] rounded" />
              <Skeleton className="h-5 w-[90%] rounded" />
              <Skeleton className="h-5 w-[85%] rounded" />
            </div>

            <div className="space-y-3 pt-2">
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-[92%] rounded" />
              <Skeleton className="h-5 w-[75%] rounded" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-12 w-48 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
