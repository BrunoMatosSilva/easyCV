import { Separator } from "@/src/components/ui/separator"
import { TemplateListSection } from "./sections/templates-list"
import { LayoutSection } from "./sections/layout"
import { ThemeSection } from "./sections/theme"
import { LanguageSection } from "./sections/language"

export const StructureSidebar = () => {
  return(
    <aside className="w-full h-full p-6 overflow-y-auto">
      <TemplateListSection />
      <Separator className="my-5" />
      <LayoutSection />
      <Separator className="my-5" />
      <ThemeSection />
      <Separator className="my-5" />
      <LanguageSection />
    </aside>
  )
}