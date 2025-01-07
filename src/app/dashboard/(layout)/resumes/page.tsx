import { ResumesList } from "@/src/components/pages/dashboard/resumes/resumes-list";
import { Suspense } from "react";
import { ResumeListSkeleton } from "../../../../components/pages/dashboard/resumes/resumes-list/skeleton";

export default function DashboardResumesPage() {
  return (
    <>
    <h1 className="text-4xl font-bold font-title mb-6">Currículos</h1>

    <Suspense fallback={<ResumeListSkeleton />}>
      <ResumesList />
    </Suspense>
    </>
  )
}