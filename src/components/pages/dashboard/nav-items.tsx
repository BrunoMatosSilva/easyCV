"use client";

import { HelpCircleIcon, Newspaper, SquareUser } from "lucide-react"
import Link from "next/link"
import { Button } from "../../ui/button"
import { cn } from "@/src/lib/utils"
import { usePathname } from "next/navigation"

export const NavItems = () => {
  const pathname = usePathname()
  const navItems = [
    {
      label: "Currículos",
      icon: Newspaper,
      path: "/dashboard/resumes"
    },
    {
      label: "Configurações de Conta",
      icon: SquareUser,
      path: "/dashboard/account"
    },
    {
      label: "Reportar Problema",
      icon: HelpCircleIcon,
      path: "/dashboard/contact"
    },
  ]

  return(
    <nav className="w-full flex flex-col gap-2 px-2 py-4">
      {
        navItems.map((item) => {
          const isActive = pathname.startsWith(item.path)

          return (
            <Link key={item.path} href={item.path}>
              <Button 
              variant="ghost" 
              className={cn(
                "w-full gap-2 justify-start",
                isActive && "bg-accent"
              )}
              >
                <item.icon size={16} />
                {item.label}
              </Button>
            </Link>
          )
        })
      }
    </nav>
  )
}
