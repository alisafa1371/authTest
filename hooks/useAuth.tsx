"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user-context";

export function useAuth(redirectToLogin = false) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user && redirectToLogin) {
      router.push("/auth");
    }
  }, [user, isLoading, redirectToLogin, router]);

  return { user, isLoading };
}
