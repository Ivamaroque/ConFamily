import type { ResumoMensal } from "@/lib/types";

async function getResumo(familiaId: string, periodo: string): Promise<ResumoMensal> {
  const res = await fetch(
    `/api/painel/resumo?familiaId=${familiaId}&periodo=${periodo}`
  );
  if (!res.ok) throw new Error("Erro ao buscar resumo");
  const json = await res.json();
  return json.data;
}

export const painelService = { getResumo };
