import { ResumePage } from "@/src/components/pages/dashboard/resume"
import { getResumeById } from "@/src/db/queries"
import { auth } from "@/src/lib/auth"
import { notFound } from "next/navigation"

type DashboardResumesPageProps = {
  params: { id: string };
}

export default async function DashboardResumePage({ params }: DashboardResumesPageProps) {
  const resumeId = params.id;

  const resume = await getResumeById(resumeId);

  if (!resume) return notFound();

  const initialData = resume.data as ResumeData;

  const session = await auth();

  return (
    <ResumePage title={resume.title} initialData={initialData} user={session?.user} />
  );
}