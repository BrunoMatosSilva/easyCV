import type { ReactNode } from "react"
import Logo from "@/src/assets/easycv-logo.svg"

type DashboardLayoutProps = {
  children: ReactNode;
}

export default function DashboardLayout({children}: DashboardLayoutProps) {
  return (
    <div className="w-full h-screen overflow-hidden grid grid-cols-[300px,1fr]">
      <aside className="w-full h-full flex flex-col items-center border-r border-muted">
        <div className="w-full p-6 border-b border-muted">
          <Logo className="max-w-[150px] mx-auto" />
        </div>
      </aside>

      <main>
        {children}
      </main>
    </div>
  )
}