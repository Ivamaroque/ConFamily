import type { Metadata } from "next";

export const metadata: Metadata = { title: "Despesas — ConFamily" };

export function DespesasListaPage() {
  return (
    <div className="px-4 pt-4 space-y-4">
      <h1 className="font-display text-2xl font-bold text-on-surface">
        Despesas
      </h1>
      {/* TODO: <DespesaFilters /> */}
      {/* TODO: <DespesaList /> */}
    </div>
  );
}
