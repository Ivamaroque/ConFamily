import type { Despesa } from "@/lib/types";
import type { CreateDespesaInput, UpdateDespesaInput } from "@/lib/validations/schemas";

export interface ListDespesasParams {
  familiaId: string;
  page?: number;
  perPage?: number;
  inicio?: string;
  fim?: string;
  categoriaId?: string;
  membroId?: string;
}

async function list(params: ListDespesasParams): Promise<Despesa[]> {
  const sp = new URLSearchParams({
    familiaId: params.familiaId,
    page: String(params.page ?? 1),
    perPage: String(params.perPage ?? 20),
    ...(params.inicio ? { inicio: params.inicio } : {}),
    ...(params.fim ? { fim: params.fim } : {}),
    ...(params.categoriaId ? { categoriaId: params.categoriaId } : {}),
    ...(params.membroId ? { membroId: params.membroId } : {}),
  });
  const res = await fetch(`/api/despesas?${sp}`);
  if (!res.ok) throw new Error("Erro ao buscar despesas");
  const json = await res.json();
  return json.data;
}

async function create(input: CreateDespesaInput): Promise<Despesa> {
  const res = await fetch("/api/despesas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error?.message ?? "Erro ao criar despesa");
  }
  const json = await res.json();
  return json.data;
}

async function update(id: string, input: UpdateDespesaInput): Promise<Despesa> {
  const res = await fetch(`/api/despesas/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error?.message ?? "Erro ao atualizar despesa");
  }
  const json = await res.json();
  return json.data;
}

async function remove(id: string): Promise<void> {
  const res = await fetch(`/api/despesas/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao remover despesa");
}

export const despesasService = { list, create, update, remove };
