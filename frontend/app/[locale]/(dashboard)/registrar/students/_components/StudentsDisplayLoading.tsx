import { Skeleton } from "@/components/ui/skeleton";

export default function StudentsDisplayLoading() {
  return (
    <div className="h-[calc(100vh-130px)] flex flex-col items-center justify-between w-full mt-2">
      <div className="flex flex-col items-center w-full gap-y-8">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-[44px] rounded-sm" />
        ))}
      </div>
      <div className="flex gap-x-2">
        <Skeleton className="w-[70px] h-[34px] rounded-sm" />
        <Skeleton className="w-[150px] h-[34px] rounded-sm" />
        <Skeleton className="w-[70px] h-[34px] rounded-sm" />
      </div>
    </div>
  );
}
