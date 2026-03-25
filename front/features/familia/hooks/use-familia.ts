"use client";

import { useCallback, useEffect, useState } from "react";
import type { Familia, MembroFamilia } from "@/lib/types";
import { familiaService } from "../services/familia.service";

export function useFamilia(familiaId: string) {
  const [familia, setFamilia] = useState<Familia | null>(null);
  const [membros, setMembros] = useState<MembroFamilia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [f, m] = await Promise.all([
        familiaService.get(familiaId),
        familiaService.listMembros(familiaId),
      ]);
      setFamilia(f);
      setMembros(m);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }, [familiaId]);

  useEffect(() => { load(); }, [load]);

  return { familia, membros, loading, error, refetch: load };
}
