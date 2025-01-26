import { Button } from "@/src/components/ui/button";
import { EditorField } from "@/src/components/ui/editor/field";
import { InputField } from "@/src/components/ui/input/field";
import { queryKeys } from "@/src/constants/query-keys";
import { ApiService } from "@/src/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  jobTitle: string;
  jobDescription: string;
};

type GenerationData = {
  headline: string;
  summary: string;
  skills: {
    name: string;
    keywords: string;
  }[];
}

type GenerateFromJobTitleProps = {
  onClose: () => void;
};

export const GenerateFromJobTitle = ({ onClose }: GenerateFromJobTitleProps) => {
  const { control, formState, handleSubmit } = useForm<FormData>();
  const { setValue } = useFormContext<ResumeData>();

  const queryClient = useQueryClient();

  const { mutate: handleGenerate, isPending } = useMutation({
    mutationFn: ApiService.generateContentForJob,
    onSuccess: (data) => {
      const generation = JSON.parse(data.data) as GenerationData;

      setValue("content.infos.headline", generation.headline);
      setValue("content.summary", generation.summary);
      setValue("content.skills", generation.skills);
  
      toast.success("Conteúdo gerado com sucesso!");
  
      queryClient.invalidateQueries({ queryKey: queryKeys.credits })
  
      onClose();
    }
  });

  const onSubmit = async (formData: FormData) => {
    handleGenerate(formData);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <InputField
        control={control}
        name="jobTitle"
        label="Job title"
        placeholder="Frontend developer"
        required
      />
      <EditorField
        control={control}
        name="jobDescription"
        label="Job description(optional)"
        className="min-h-[200px] max-h-[300px"
      />
      <Button
        className="w-max ml-auto"
        type="submit"
        disabled={isPending}
      >
        Generate conteúdo
      </Button>
    </form>
  );
};