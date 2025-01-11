"use client"

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import { useTanstackQuery } from "@/src/lib/tanstack-query";
import { Toaster } from "../ui/sonner";

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
          {children}
          <Toaster />
        </ThemeProvider> 
    </QueryClientProvider>
  )
}