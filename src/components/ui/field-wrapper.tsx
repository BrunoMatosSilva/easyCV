import type { ReactNode } from "react";
import { Label } from "./label"
import { cn } from "@/src/lib/utils";

type FieldWrapperProps = {
  label: string;
  children: ReactNode;
  className?: string;
}

export const FieldWrapper = ({ label, children, className }: FieldWrapperProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label>{label}</Label>
      {children}
    </div>
  )
}