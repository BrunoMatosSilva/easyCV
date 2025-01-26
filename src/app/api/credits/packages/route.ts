import { stripe } from "@/src/lib/stripe";

const creditProductI = process.env.STRIPE_CREDIT_PRODUCT_ID!;

export const GET = async () => {
  const prices = await stripe.prices.list({
    product: creditProductI,
  });

  return Response.json(prices.data ?? []);
}