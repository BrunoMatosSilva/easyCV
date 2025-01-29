"use client"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from "@/src/components/ui/separator"
import { ArrowBigRightDashIcon, HelpCircleIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { api } from '@/src/lib/axios'
import { Button } from '@/src/components/ui/button'
import axios from 'axios'

const contactFormSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(500),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function DashboardContactPage() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      await axios.post('/api/contact', data)
      toast.success('Mensagem enviada com sucesso!')
      reset()
    } catch (error) {
      toast.error('Ocorreu um erro ao enviar a mensagem. Tente novamente.')
    }
  }

  return (
    <>
      <h1 className="font-title font-bold text-3xl flex items-center gap-2">
        <HelpCircleIcon size={25} className="text-muted-foreground"/>
        Reporta Problema
      </h1>

      <Separator className="my-6" />

      <section>
        <p>
          Caso tenha algum problema com nossa aplicação, por favor preencher o formulario abaixo e nos enviar.
        </p>
        <span>
          Nossa equipe de suporte entrar em contato o mais breve possivel.
        </span>

        <form
        className="mt-12 w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        >
          <input
            placeholder="Nome"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            {...register('name')}
          />
          <input
            placeholder="E-mail"
            type="email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            {...register('email')}
          />
          <textarea
            placeholder="Mensagem"
            className="resize-none w-full h-[138px] rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            {...register('message')}
            maxLength={500}
          />

            <div className="relative w-max mx-auto mt-6">
              <Button type="submit" disabled={isSubmitting}>
                Enviar
                <ArrowBigRightDashIcon size={18} />
              </Button>
            </div>
        </form>
      </section>
    </>
  )
}