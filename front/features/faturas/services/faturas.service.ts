import type { Fatura } from "@/lib/types";
import type { UploadFaturaInput, RevisarExtracaoInput } from "@/lib/validations/schemas";

async function list(familiaId: string): Promise<Fatura[]> {
  const res = await fetch(`/api/faturas?familiaId=${familiaId}`);
  if (!res.ok) throw new Error("Erro ao buscar faturas");
  const json = await res.json();
  return json.data;
}

async function get(id: string): Promise<Fatura> {
  const res = await fetch(`/api/faturas/${id}`);
  if (!res.ok) throw new Error("Fatura não encontrada");
  const json = await res.json();
  return json.data;
}

async function upload(input: UploadFaturaInput): Promise<Fatura> {
  const form = new FormData();
  form.append("familiaId", input.familiaId);
  form.append("arquivo", input.arquivo);

  const res = await fetch("/api/faturas", { method: "POST", body: form });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error?.message ?? "Erro ao fazer upload da fatura");
  }
  const json = await res.json();
  return json.data;
}

async function revisar(id: string, input: RevisarExtracaoInput): Promise<void> {
  const res = await fetch(`/api/faturas/${id}/revisar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error?.message ?? "Erro ao confirmar revisão");
  }
}

export const faturasService = { list, get, upload, revisar };
