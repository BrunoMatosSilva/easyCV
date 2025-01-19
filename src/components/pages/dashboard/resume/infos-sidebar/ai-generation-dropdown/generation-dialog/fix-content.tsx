import { Button } from "@/src/components/ui/button";
import { ApiService } from "@/src/services/api";
import { useMutation } from "@tanstack/react-query";
import { useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { mergician } from "mergician";

type GenerateToFixContentProps = {
  onClose: () => void;
};

export const GenerateToFixContent = ({ onClose }: GenerateToFixContentProps) => {
  const { formState, handleSubmit } = useForm();
  const { getValues, setValue } = useFormContext<ResumeData>();

  const { mutateAsync: handleGenerate } = useMutation({
    mutationFn: ApiService.fixContent,
  });

  const onSubmit = async () => {
    const content = getValues("content");
    const data = await handleGenerate(content);

    const generation = JSON.parse(data.data);

    const margedContent = mergician(content, generation) as ResumeContentData;
    setValue("content", margedContent);

    toast.success("Conteúdo gerado com sucesso!");

    onClose();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
     <p>
      Esta funcionalidade aprimora o conteúdo atual do currículo e também corrige possíveis erros gramáticais.
      <strong>Lembre-se de preencher o conteúdo antes da geração.</strong>
     </p>
      
      <p>Isso pode levar alguns segundos, aguarde o resultado.</p>

      <Button
        className="w-max ml-auto"
        type="submit"
        disabled={formState.isSubmitting}
      >
        Generate conteúdo
      </Button>
    </form>
  );
};