"use client";

import { useEffect, useRef } from "react";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function EnsureUser() {
  const { isAuthenticated } = useConvexAuth();
  const upsert = useMutation(api.users.upsertCurrentUser);
  const done = useRef(false);

  useEffect(() => {
    if (isAuthenticated && !done.current) {
      done.current = true;
      upsert().catch(() => {
        done.current = false;
      });
    }
  }, [isAuthenticated, upsert]);

  return null;
}
