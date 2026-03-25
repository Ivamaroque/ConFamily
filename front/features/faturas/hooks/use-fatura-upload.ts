"use client";

import { useState } from "react";
import type { Fatura } from "@/lib/types";
import { faturasService } from "../services/faturas.service";
import type { UploadFaturaInput } from "@/lib/validations/schemas";

export function useFaturaUpload() {
  const [fatura, setFatura] = useState<Fatura | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(input: UploadFaturaInput) {
    setLoading(true);
    setError(null);
    try {
      const result = await faturasService.upload(input);
      setFatura(result);
      return result;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro inesperado");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { fatura, upload, loading, error };
}
