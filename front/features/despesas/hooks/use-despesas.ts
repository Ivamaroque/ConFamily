"use client";

import { useCallback, useEffect, useState } from "react";
import type { Despesa } from "@/lib/types";
import { despesasService, type ListDespesasParams } from "../services/despesas.service";

export function useDespesas(params: ListDespesasParams) {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await despesasService.list(params);
      setDespesas(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.familiaId, params.inicio, params.fim, params.categoriaId, params.membroId, params.page]);

  useEffect(() => { fetch(); }, [fetch]);

  return { despesas, loading, error, refetch: fetch };
}
