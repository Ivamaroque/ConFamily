"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authService } from "../services/auth.service";
import type { LoginInput } from "@/lib/validations/schemas";

export function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(input: LoginInput) {
    setLoading(true);
    setError(null);
    try {
      await authService.login(input);
      router.push("/painel");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
