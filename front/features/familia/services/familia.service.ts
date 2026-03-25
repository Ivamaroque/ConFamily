import type { Familia, MembroFamilia } from "@/lib/types";
import type { CreateFamiliaInput, ConvidarMembroInput } from "@/lib/validations/schemas";

async function get(familiaId: string): Promise<Familia> {
  const res = await fetch(`/api/familia/${familiaId}`);
  if (!res.ok) throw new Error("Família não encontrada");
  const json = await res.json();
  return json.data;
}

async function create(input: CreateFamiliaInput): Promise<Familia> {
  const res = await fetch("/api/familia", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error?.message ?? "Erro ao criar família");
  }
  const json = await res.json();
  return json.data;
}

async function listMembros(familiaId: string): Promise<MembroFamilia[]> {
  const res = await fetch(`/api/familia/${familiaId}/membros`);
  if (!res.ok) throw new Error("Erro ao buscar membros");
  const json = await res.json();
  return json.data;
}

async function convidar(
  familiaId: string,
  input: ConvidarMembroInput
): Promise<void> {
  const res = await fetch(`/api/familia/${familiaId}/membros`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error?.message ?? "Erro ao convidar membro");
  }
}

async function removerMembro(familiaId: string, membroId: string): Promise<void> {
  const res = await fetch(`/api/familia/${familiaId}/membros/${membroId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao remover membro");
}

export const familiaService = { get, create, listMembros, convidar, removerMembro };
