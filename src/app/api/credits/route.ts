import { getUserCredits } from "@/src/db/queries"

export const GET = async () => {
  const credits = await getUserCredits()

  return Response.json({ credits })
}