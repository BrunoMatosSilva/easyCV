"use client"

import { Button } from "@/src/components/ui/button";
import { Dialog, type BaseDialogProps } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { duplicateResume } from "@/src/db/actions";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  title: string;
}

export const DuplicateResumeDialog = (props: BaseDialogProps) => {
  const [open, setOpen] = useState(false);

  const methods = useForm<FormData>();
  const params = useParams();
  const router = useRouter();

  const resumeId = params.id as string

  const onSubmit = async (data: FormData) => {
    try {
      const newResume = await duplicateResume(resumeId, data.title)
      toast.success("Currículo duplicado com sucesso.")
      router.push(`/dashboard/resumes/${newResume.id}`)
    } catch (error) {
      console.error(error)
      toast.error("Erro ao duplicar currículo, tente novamente mais tarde.")
    }
  }

  return (
    <Dialog 
    {...props}
    open={open}
    setOpen={setOpen}
    title="Duplicar Currículo"
    description="Será criado um novo currículo com o mesmo conteúdo do atual. Insira o novo título para o currículo."
    content={
      <form className="flex flex-col" onSubmit={methods.handleSubmit(onSubmit)}>
        <Controller 
        control={methods.control}
        name="title"
        render={({ field }) => (
          <Input
          placeholder="Novo título"
          {...field}
           />
        )}
        />

        <div className="flex mt-4 ml-auto gap-4">
          <Button variant="secondary">
             Cancelar
          </Button>
          <Button type="submit">
             Duplicar
          </Button>
        </div>
      </form>
    }
    />
  )
}