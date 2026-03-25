"use client";

import { useCallback, useEffect, useState } from "react";
import type { ResumoMensal } from "@/lib/types";
import { painelService } from "../services/painel.service";

export function usePainel(familiaId: string, periodo: string) {
  const [resumo, setResumo] = useState<ResumoMensal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await painelService.getResumo(familiaId, periodo);
      setResumo(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }, [familiaId, periodo]);

  useEffect(() => { load(); }, [load]);

  return { resumo, loading, error, refetch: load };
}
