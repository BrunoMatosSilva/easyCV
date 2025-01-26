"use client"

import { Suspense, useEffect, type ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import { useTanstackQuery } from "@/src/lib/tanstack-query";
import { Toaster } from "../ui/sonner";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const CredistToast = () => {
  const searchParams = useSearchParams();

  const successCheckoutParams = searchParams.get('success');

  useEffect(() => {
    if (successCheckoutParams === "true") {
      toast.success('Compra realizada com sucesso! Seus créditos foram adicionados à sua conta.');
    }
  }, [successCheckoutParams]);

  return null;
}

type ClientProvidersProps = {
  children: ReactNode;
}

export const ClientProviders = ({ children }: ClientProvidersProps) => {
  const queryClient = useTanstackQuery()

  return (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
          <Suspense>
            <CredistToast />
          </Suspense>
          {children}
          <Toaster />
        </ThemeProvider> 
    </QueryClientProvider>
  )
}