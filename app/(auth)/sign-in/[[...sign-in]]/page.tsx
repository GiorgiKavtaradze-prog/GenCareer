import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { localRedirectPath } from "@/lib/safe-redirect";
export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_url?: string }>;
}) {
  const [{ userId }, { redirect_url }] = await Promise.all([
    auth(),
    searchParams,
  ]);
  if (userId) {
    redirect(localRedirectPath(redirect_url) ?? "/feed");
  }
  return <SignIn />;
}
