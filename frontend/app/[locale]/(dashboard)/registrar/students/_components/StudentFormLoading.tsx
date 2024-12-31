import { Skeleton } from "@/components/ui/skeleton";

export default function StudentFormLoading() {
  return (
    <div className="flex items-start gap-x-8">
      <Skeleton className="h-64 w-64" />
      <div className="grid grid-cols-3 gap-5 w-full">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}
