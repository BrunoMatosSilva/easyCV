"use client"

import { Button } from "@/src/components/ui/button";
import { Dialog, type BaseDialogProps } from "@/src/components/ui/dialog"
import { InputField } from "@/src/components/ui/input/field";
import { FormProvider, useForm } from "react-hook-form"

type FormData = {
  title: string;
}

export const NewResumeDialog = (props: BaseDialogProps) => {
  const methods = useForm<FormData>();

  function onSubmit() {

  }

  return(
    <Dialog 
    {...props}
    title="Criar novo currículo"
    description="Para começar, escolha um título para seu currículo"
    content={
      <FormProvider {...methods}>
        <form
        className="flex flex-col"
        onSubmit={methods.handleSubmit(onSubmit)}>
        <InputField
        label="Título"
        name="title"
        required
        />

        <Button
        type="submit"
        className="w-max mt-6 ml-auto"
        >
          Criar
        </Button>
      </form>
      </FormProvider>
    }
    />
  )
}