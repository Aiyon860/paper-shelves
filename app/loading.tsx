import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl animate-in fade-in duration-500">
      <div className="mb-10">
        <Skeleton className="h-10 w-64 md:h-12 md:w-80 rounded-md" />
        <Skeleton className="h-6 w-full max-w-xl mt-3 rounded-md" />
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col h-full overflow-hidden rounded-xl bg-card/80 border border-border/60 shadow-sm"
          >
            <div className="p-5 pb-0">
              <Skeleton className="relative aspect-2/3 w-full shrink-0 overflow-hidden rounded-md" />
            </div>

            <div className="flex flex-col flex-1 p-5 gap-3">
              <div className="space-y-2">
                <Skeleton className="h-6 w-full rounded-md" />
                <Skeleton className="h-4 w-2/3 rounded-md" />

                <div className="flex gap-1.5 pt-1">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
              </div>

              <div className="space-y-1 mt-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-4/5 rounded-md" />
              </div>

              <div className="mt-auto pt-5 flex items-end justify-between">
                <Skeleton className="h-3 w-24 rounded-md" />
              </div>
            </div>

            <div className="px-5 pb-5 pt-0 flex justify-end">
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
