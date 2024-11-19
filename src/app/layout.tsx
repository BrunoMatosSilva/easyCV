import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "@/src/styles/globals.css";
import { cn } from "@/src/lib/utils";
import { ThemeProvider } from "../components/shared/theme-provider";

const fontSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" });
const fontTitle = Nunito({ subsets: ["latin"], variable: "--font-title" });

export const metadata: Metadata = {
  title: "EasyCV",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          "min-hg-screen bg-background font-sans antialiased", 
          fontTitle.variable, fontSans.variable
        )}
      >
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
