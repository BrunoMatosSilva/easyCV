import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "@/src/styles/globals.css";
import { cn } from "@/src/lib/utils";
import { setDefaultOptions } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Toaster } from "../components/ui/sonner";
import { ClientProviders } from "../components/shared/client-providers";

const fontSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" });
const fontTitle = Nunito({ subsets: ["latin"], variable: "--font-title" });

export const metadata: Metadata = {
  title: "EasyCV",
};

setDefaultOptions({ locale: ptBR })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-hg-screen bg-background font-sans antialiased", 
          fontTitle.variable, fontSans.variable
        )}
        suppressHydrationWarning
      >
        <ClientProviders
        >
          {children}
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}
