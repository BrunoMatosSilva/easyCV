"use server"

import { revalidatePath } from "next/cache";
import { auth } from "../lib/auth";
import { db } from "./drizzle";
import { resumes } from "./schema";
import { eq } from "drizzle-orm";

export const createResume = async (title: string) => {
  const session = await auth();
  
  const userId = session?.user?.id;

  if (!userId) throw Error("Usuário não encontrando.");

  const newResume = await db
  .insert(resumes)
  .values({title, userId})
  .returning();

  revalidatePath("/dashboard/resumes")

  return newResume[0];
}

export const updateResumeData = async (id: string, data: ResumeData) => {
  const session = await auth();
  
  const userId = session?.user?.id;

  if (!userId) throw Error("Usuário não encontrando.");

  const updatedResume = await db
  .update(resumes)
  .set({data, updatedAt: new Date()})
  .where(eq(resumes.id, id))
  .returning();

  revalidatePath("/dashboard/resumes");

  return updatedResume[0]

}