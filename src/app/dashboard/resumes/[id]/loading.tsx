import { Skeleton } from "@/src/components/ui/skeleton";

export default function ResumeLoadingPage() {
  return (
    <div className="grid grid-cols-3 gap-2 h-screen w-full">
      <Skeleton className="w-fill h-full" />
      <Skeleton className="w-fill h-full" />
      <Skeleton className="w-fill h-full" />
    </div>
  )
}