import { Button } from "@/src/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { ApiService } from "@/src/services/api";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { languagesOptions } from "../../../structure-sidebar/sections/language";
import { mergician } from "mergician";

type FormData = {
  language: ResumeLanguages;
};

type GenerateTranslationProps = {
  onClose: () => void;
};

export const GenerateTranslation = ({ onClose }: GenerateTranslationProps) => {
  const { control, formState, handleSubmit } = useForm<FormData>();
  const { setValue, getValues } = useFormContext<ResumeData>();

  const { mutateAsync: handleGenerate } = useMutation({
    mutationFn: ApiService.translateContent,
  });

  const onSubmit = async (formData: FormData) => {
    const content = getValues("content");

    const selectedLanguage = languagesOptions.find(
      (item) => item.value === formData.language
    );

    const data = await handleGenerate({
      content,
      language: selectedLanguage?.label!,
    });

    const generation = JSON.parse(data.data);

    const margedContent = mergician(content, generation) as ResumeContentData;

    setValue("content", margedContent);
    setValue("structure.language", formData.language);

    toast.success("Conteúdo gerado com sucesso!");

    onClose();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <p>
        Está funcionalidade traduz o conteudo atual para a linguagem selecionada abaixo.
      </p>

      <p>
        Isso pode levar alguns segundos, aguarde o resultado.
      </p>
      <Controller
      control={control}
      name="language"
      rules={{ required: true }}
      render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecionar a linguagem" />
          </SelectTrigger>
          <SelectContent>
            {languagesOptions.map(( language)  => (
              <SelectItem 
              key={language.value} 
              value={language.value}>
                {language.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      />

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