import { convexClient, eveConvexSecret } from "./convex";
import { api } from "../../convex/_generated/api";

export function requireClerkUserId(ctx: {
  session: { auth: { current: { principalId?: string } | null } };
}): string {
  const id = ctx.session?.auth?.current?.principalId;
  if (!id) throw new Error("No authenticated user on this turn.");
  return id;
}

export function eveConvex(ctx: {
  session: { auth: { current: { principalId?: string } | null } };
}) {
  return {
    convex: convexClient(),
    secret: eveConvexSecret(),
    clerkUserId: requireClerkUserId(ctx),
    api,
  };
}
