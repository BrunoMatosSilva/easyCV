import { Button } from "@/src/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { BadgeCent, Bot, BriefcaseBusiness, CirclePercent, Languages, PencilLine } from "lucide-react"
import { GenerationDialog } from "./generation-dialog"
import { useState } from "react"
import { set } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import { ApiService } from "@/src/services/api"
import { Skeleton } from "@/src/components/ui/skeleton"
import { BuyCreditsDialog } from "./buy-credits-dialog"
import { queryKeys } from "@/src/constants/query-keys"
import { toast } from "sonner"

export const AIGenerationDropdown = () => {
  const [generationMode, setGenerationMode] = useState<AIGenerationMode | null>(null);
  const [showCreditsDialog, setShowCreditsDialog] = useState(false);

  const onAction = (mode: AIGenerationMode) => {
    if (!credits) {
      toast.error("Você não tem créditos suficientes para realizar está ação.", {
        action: {
          label: "Comprar creditos",
          onClick: () => setShowCreditsDialog(true),
        }
      });
      return;
    }
    setGenerationMode(mode)
  }

  const actions = [
    {
      label: "Comprar créditos",
      icon: CirclePercent,
      onClick: () => setShowCreditsDialog(true),
    },
    {
      label: "Gerar contéudo para vaga de emprego",
      icon: BriefcaseBusiness,
      onClick: () => onAction("JOB_TITLE")
    },
    {
      label: "Melhorar e corrigir contéudo existente",
      icon: PencilLine,
      onClick: () => onAction("FIX_CONTENT")
    },
    {
      label: "Traduzir contéudo existente",
      icon: Languages,
      onClick: () => onAction("TRANSLATE_CONTENT")
    },
  ]

  const { data: credits, isLoading } = useQuery({
    queryKey: queryKeys.credits,
    queryFn: ApiService.getCredits
  })

  return (
    <>
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <Button className="gap-2 text-xs px-2.5 py-1 h-9">
          <Bot size={20} />
          Inteligência Artificial
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent sideOffset={10} align="start">
      <DropdownMenuLabel className="text-muted-foreground text-xs flex items-center gap-1">
        Você possui{" "}
        <strong className="text-foreground inline-flex gap-0.5 items-center">
          <BadgeCent size={14} />
          {isLoading ? <Skeleton className="w-5 h-5" /> : credits}{" "}
          {credits === 1 ? "crédito" : "créditos"}
        </strong>
        </DropdownMenuLabel>
      <DropdownMenuSeparator />
      {actions.map((action) => {
        return (
          <DropdownMenuItem 
          key={action.label}
          className="gap-2"
          onClick={action.onClick}
          disabled={isLoading}
          >
            <action.icon size={18} className="text-muted-foreground" />
            {action.label}
          </DropdownMenuItem>
        )
      })}
    </DropdownMenuContent>
    </DropdownMenu>

    <BuyCreditsDialog 
    open={showCreditsDialog}
    setOpen={setShowCreditsDialog}
    />

    {!!generationMode && (
      <GenerationDialog
        mode={generationMode}
        open={!!generationMode}
        setOpen={(value) => {
          if (!value) setGenerationMode(null)
        }}
      />
    )}
    </>
  )
}