import type { ReactNode } from "react";
import { Label } from "./label"
import { cn } from "@/src/lib/utils";
import type { FieldError } from "react-hook-form";

type FieldWrapperProps = {
  label: string;
  children: ReactNode;
  className?: string;
  error?: FieldError;
}

export const FieldWrapper = ({ label, children, className, error }: FieldWrapperProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label>{label}</Label>
      {children}
      {error && (
          <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  )
}