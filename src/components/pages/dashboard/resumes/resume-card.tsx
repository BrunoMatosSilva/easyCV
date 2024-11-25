import Link from "next/link"
import type { ReactNode } from "react";

type ResumeCardButtonProps = {
  title: string;
  description: string;
  icon?: ReactNode;
}

export const ResumeCardButton = ({ title, description, icon }: ResumeCardButtonProps) => {
  return (
    <button className="w-full h-[300px] bg-muted/50 rounded border border-muted-foreground/20 flex items-center justify-center relative outline-none overflow-hidden hover:brightness-105 dark:hover:brightness-125 transition-all">
      {icon}

      <div className="absolute w-full left-0 bottom-0 p-3 text-left bg-gradient-to-t from-background/80">
        <p className="text-sm font-semibold font-title">{title}</p>
        <span className="block text-xs text-muted-foreground">{description}</span>
      </div>
    </button>
  )
}

export const ResumeCard = () => {
  return (
    <Link href="/dashboard/resumes/example" className="block w-full">
      <ResumeCardButton 
      title="Meu curriculum"
      description="Última atualização a 22 minutos"
      />
    </Link>
  )
}