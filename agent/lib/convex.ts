import { ConvexHttpClient } from "convex/browser";

export function convexClient() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) throw new Error("NEXT_PUBLIC_CONVEX_URL is not set for the Eve runtime");
  return new ConvexHttpClient(url);
}

export function eveConvexSecret() {
  const secret = process.env.EVE_CONVEX_SECRET;
  if (!secret) throw new Error("EVE_CONVEX_SECRET is not set for the Eve runtime");
  return secret;
}
