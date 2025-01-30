import { api } from "@/src/lib/axios";
import type Stripe from "stripe";
import type { ContactFormData } from "../app/dashboard/(layout)/contact/page";

type ResumeDownloadPayload = {
  html: string;
  structure: ResumeStructureData;
};

const getResumeUrl = async (payload: ResumeDownloadPayload) => {
  const { data } = await api.post("resume/download", payload, {
    responseType: "blob",
  });

  return window.URL.createObjectURL(data);
};

type AiGenerationPayload = {
  jobTitle: string;
  jobDescription: string;
};

const generateContentForJob = async (payload: AiGenerationPayload) => {
  const { data } = await api.post("/generate/job-title", payload);

  return data;
};

const fixContent = async (content: ResumeContentData) => {
  const { data } = await api.post("/generate/fix-content", { content });

  return data
}

type AiTranslationPayload = {
  content: ResumeContentData;
  language: string;
};

const translateContent = async (payload: AiTranslationPayload) => {
  const { data } = await api.post("/generate/translate", payload);

  return data;
}

const getCredits = async () => {
  const { data } = await api.get<{ credits: number }>("/credits");

  return data?.credits ?? 0;
}

const getPackages = async () => {
  const { data } = await api.get<Stripe.Price[]>("/credits/packages");

  return data;
}

const getCheckoutUrl = async (priceId: string, currentPathname: string) => {
  const { data } = await api.post<{ url: string }>("/credits/packages/checkout", { priceId, currentPathname });

  return data.url;
}

const getPortalUrl = async (currentPathname: string) => {
  const { data } = await api.post<{ url: string }>("/credits/transactions", { currentPathname })

  return data.url;
}

const sendContact = async (form: ContactFormData) => {
  const { data } = await api.post("/contact", form )

  return data;
}

export const ApiService = {
  getResumeUrl,
  generateContentForJob,
  fixContent,
  translateContent,
  getCredits,
  getPackages,
  getCheckoutUrl,
  getPortalUrl,
  sendContact
};