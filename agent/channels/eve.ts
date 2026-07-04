import { eveChannel } from "eve/channels/eve";
import {
  localDev,
  ForbiddenError,
  type AuthFn,
} from "eve/channels/auth";
import { createClerkClient } from "@clerk/backend";
import { userSubscriptionIsPro } from "@/lib/billing";

function clerkAuth(): AuthFn<Request> {
  return async (request) => {
    const clerk = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY!,
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
    });

    const requestState = await clerk.authenticateRequest(request);
    const auth = requestState.toAuth();

    if (!auth || !auth.userId) return null;
    const isPro = await userSubscriptionIsPro(clerk, auth.userId);
    if (!isPro) {
      throw new ForbiddenError({
        message: "Upgrade to Pro to use the AI Career Agent.",
      });
    }

    return {
      authenticator: "app",
      principalId: auth.userId,
      principalType: "user",
      attributes: {},
    };
  };
}

export default eveChannel({
  auth: [clerkAuth(), localDev()],
});
