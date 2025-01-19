import { Dialog, type BaseDialogProps } from "@/src/components/ui/dialog"
import { GenerateFromJobTitle } from "./job-title"

type GenerationDialogProps = BaseDialogProps & {
  mode: AIGenerationMode,
  setOpen: (open: boolean) => void
}

export const GenerationDialog = ({ mode, ...props}: GenerationDialogProps) => {
  const onClose = () => {
    props.setOpen(false);
  }
  const configPerMode: Record<AIGenerationMode, JSX.Element> = {
    JOB_TITLE: <GenerateFromJobTitle onClose={onClose} />,
    FIX_CONTENT: <div>Melhorar e corrigir contéudo existente</div>,
    TRANSLATE_CONTENT: <div>Traduzir contéudo existente</div>,
  }

  const content = configPerMode[mode];
  return (
    <Dialog 
      {...props}
      title="Inteligência Artificial"
      description="O contéudo gerado sobrescreverá o contéudo atual. Cada geracao custa 1 crédito."
      content={content}
    />
  )
}