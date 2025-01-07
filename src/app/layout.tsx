import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "@/src/styles/globals.css";
import { cn } from "@/src/lib/utils";
import { setDefaultOptions } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ThemeProvider } from "../components/shared/theme-provider";
import { Toaster } from "../components/ui/sonner";

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
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
