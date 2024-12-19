import { Palette } from "lucide-react"
import { SectionTitle } from "../../infos-sidebar/section-title"

import colors from "tailwindcss/colors"
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

const keysToIgnore = [
  "current",
  "inherit",
  "currentColor",
  "transparent",
  "black",
  "white",
  "lightBlue",
  "warmGray",
  "trueGray",
  "coolGray",
  "blueGray",
]

const colorKeys = Object.keys(colors).filter((key) => !keysToIgnore.includes(key)) as (keyof typeof colors)[];

export const ThemeSection = () => {
  const { control } = useFormContext()
  
  return (
    <div>
      <SectionTitle title="Tema" icon={Palette} />

      <Controller
      control={control}
      name="structure.colorTheme"
      render={({ field}) => (
        <div className="grid grid-cols-7 gap-4 mt-4">
          {colorKeys.map(colorKeys =>  {
            const isSelected = field.value === colorKeys;

            return(
              <Button
              key={colorKeys}
              variant="ghost"
              className={cn(
                "w-7 h-7 p-1 rounded-full transition-all",
                isSelected && "ring-2 ring-foreground"
              )}
              onClick={() => field.onChange(colorKeys)}
              >
                <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: colors[colorKeys][500] }}
                >

                </div>
              </Button>
            )
          })}
        </div>
      )}
      />
    </div>
  )
}